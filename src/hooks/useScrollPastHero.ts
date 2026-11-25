import { useEffect, useState } from 'react';

/**
 * Muestra la barra fija móvil únicamente después de superar la sección Hero
 * y la oculta cerca del pie de página para no cubrir enlaces legales ni avisos.
 */
export function useScrollPastHero(heroId: string = 'hero', footerId: string = 'site-footer') {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const evaluate = () => {
      const ctaAnchor = document.getElementById('hero-cta-anchor');
      const heroEl = document.getElementById(heroId);
      const footerEl = document.getElementById(footerId);
      const targetEl = ctaAnchor ?? heroEl;
      if (!targetEl) {
        setVisible(false);
        return;
      }

      const targetRect = targetEl.getBoundingClientRect();
      const pastHero = targetRect.bottom < 0;

      let nearFooter = false;
      if (footerEl) {
        const footerRect = footerEl.getBoundingClientRect();
        nearFooter = footerRect.top < window.innerHeight - 16;
      }

      setVisible(pastHero && !nearFooter);
    };

    evaluate();
    window.addEventListener('scroll', evaluate, { passive: true });
    window.addEventListener('resize', evaluate, { passive: true });
    return () => {
      window.removeEventListener('scroll', evaluate);
      window.removeEventListener('resize', evaluate);
    };
  }, [heroId, footerId]);

  return visible;
}
