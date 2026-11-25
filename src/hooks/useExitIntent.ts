import { useEffect, useState } from 'react';

const EXIT_SESSION_KEY = 'pnp_exit_offer_shown_v1';

interface UseExitIntentOptions {
  enabled: boolean;
  onTrigger?: () => void;
}

/**
 * Detecta intención de salida de forma respetuosa, sin manipular el historial
 * ni bloquear la navegación, con límite de una vez por sesión.
 */
export function useExitIntent({ enabled, onTrigger }: UseExitIntentOptions) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') {
      return;
    }

    try {
      if (window.sessionStorage.getItem(EXIT_SESSION_KEY) === '1') {
        return;
      }
    } catch {
      // Continúa si sessionStorage no está disponible
    }

    let triggered = false;
    let dwellReady = false;
    const dwellTimer = window.setTimeout(() => {
      dwellReady = true;
    }, 10000);

    const triggerOnce = () => {
      if (triggered || !dwellReady) {
        return;
      }
      triggered = true;
      try {
        window.sessionStorage.setItem(EXIT_SESSION_KEY, '1');
      } catch {
        // Ignorar
      }
      setIsOpen(true);
      onTrigger?.();
    };

    const handleMouseLeave = (event: MouseEvent) => {
      if (event.clientY <= 12 && event.relatedTarget === null) {
        triggerOnce();
      }
    };

    // En móvil: solo tras permanencia mínima e inactividad prolongada de 35s sin desplazamiento
    let mobileIdleTimer: number | undefined;
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

    const resetMobileIdle = () => {
      if (!isTouchDevice) return;
      if (mobileIdleTimer) window.clearTimeout(mobileIdleTimer);
      mobileIdleTimer = window.setTimeout(() => {
        if (window.scrollY > 400) {
          triggerOnce();
        }
      }, 35000);
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    if (isTouchDevice) {
      window.addEventListener('scroll', resetMobileIdle, { passive: true });
      resetMobileIdle();
    }

    return () => {
      window.clearTimeout(dwellTimer);
      if (mobileIdleTimer) window.clearTimeout(mobileIdleTimer);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', resetMobileIdle);
    };
  }, [enabled, onTrigger]);

  return {
    isOpen,
    close: () => setIsOpen(false),
  };
}
