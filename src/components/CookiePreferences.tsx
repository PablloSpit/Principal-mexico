import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import type { CookieConsentState } from '../types/site';

interface CookiePreferencesProps {
  isOpen: boolean;
  consent: CookieConsentState;
  onClose: () => void;
  onAcceptAll: () => void;
  onRejectOptional: () => void;
  onSaveCustom: (choices: {
    preferences: boolean;
    analytics: boolean;
    marketing: boolean;
  }) => void;
}

export function CookiePreferences({
  isOpen,
  consent,
  onClose,
  onAcceptAll,
  onRejectOptional,
  onSaveCustom,
}: CookiePreferencesProps) {
  const [preferences, setPreferences] = useState(consent.preferences);
  const [analytics, setAnalytics] = useState(consent.analytics);
  const [marketing, setMarketing] = useState(consent.marketing);

  useEffect(() => {
    if (isOpen) {
      setPreferences(consent.preferences);
      setAnalytics(consent.analytics);
      setMarketing(consent.marketing);
    }
  }, [isOpen, consent]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#202A26]/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-preferences-title"
    >
      <div className="w-full max-w-[560px] max-h-[90vh] overflow-y-auto bg-[#FFFFFF] border border-[#DCE5E0] rounded-[14px] p-6 sm:p-8 shadow-xl">
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#DCE5E0]">
          <div>
            <h2
              id="cookie-preferences-title"
              className="font-display text-xl sm:text-2xl font-semibold text-[#202A26]"
            >
              Preferencias de privacidad
            </h2>
            <p className="mt-1 text-xs text-[#626C67]">
              Versión de consentimiento: {consent.version}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar configuración de cookies"
            className="inline-flex items-center justify-center w-11 h-11 rounded-[8px] border border-[#DCE5E0] text-[#202A26] hover:border-[#0B6856]"
          >
            <X size={18} strokeWidth={1.75} />
          </button>
        </div>

        <p className="mt-4 text-sm text-[#626C67] leading-relaxed">
          Administra qué categorías opcionales autorizas. Las cookies estrictamente necesarias permanecen activas para conservar tu elección y permitir el funcionamiento básico del sitio.
        </p>

        <div className="mt-6 space-y-4">
          {/* Necesarias */}
          <div className="p-4 rounded-[10px] bg-[#FAF8F3] border border-[#DCE5E0] flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[#202A26]">
                Cookies necesarias
              </p>
              <p className="mt-1 text-xs text-[#626C67] leading-relaxed">
                Permiten recordar tu consentimiento y navegar correctamente entre las secciones y documentos legales.
              </p>
            </div>
            <span className="text-xs font-semibold text-[#0B6856] whitespace-nowrap pt-0.5">
              Siempre activas
            </span>
          </div>

          {/* Preferencias */}
          <label className="p-4 rounded-[10px] bg-[#FFFFFF] border border-[#DCE5E0] flex items-start justify-between gap-4 cursor-pointer hover:border-[#0B6856]/50">
            <div>
              <span className="block text-sm font-semibold text-[#202A26]">
                Cookies de preferencias
              </span>
              <span className="mt-1 block text-xs text-[#626C67] leading-relaxed">
                Permiten recordar configuraciones opcionales de experiencia durante tu visita.
              </span>
            </div>
            <input
              type="checkbox"
              checked={preferences}
              onChange={(e) => setPreferences(e.target.checked)}
              className="mt-1 h-5 w-5 accent-[#0B6856] shrink-0"
            />
          </label>

          {/* Analíticas */}
          <label className="p-4 rounded-[10px] bg-[#FFFFFF] border border-[#DCE5E0] flex items-start justify-between gap-4 cursor-pointer hover:border-[#0B6856]/50">
            <div>
              <span className="block text-sm font-semibold text-[#202A26]">
                Cookies analíticas
              </span>
              <span className="mt-1 block text-xs text-[#626C67] leading-relaxed">
                Miden de forma agregada el rendimiento de la página sin recopilar datos médicos ni personales sensibles.
              </span>
            </div>
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              className="mt-1 h-5 w-5 accent-[#0B6856] shrink-0"
            />
          </label>

          {/* Publicitarias */}
          <label className="p-4 rounded-[10px] bg-[#FFFFFF] border border-[#DCE5E0] flex items-start justify-between gap-4 cursor-pointer hover:border-[#0B6856]/50">
            <div>
              <span className="block text-sm font-semibold text-[#202A26]">
                Cookies publicitarias
              </span>
              <span className="mt-1 block text-xs text-[#626C67] leading-relaxed">
                Permiten evaluar la atribución y desempeño de campañas digitales cuando los identificadores están activos.
              </span>
            </div>
            <input
              type="checkbox"
              checked={marketing}
              onChange={(e) => setMarketing(e.target.checked)}
              className="mt-1 h-5 w-5 accent-[#0B6856] shrink-0"
            />
          </label>
        </div>

        <div className="mt-6 pt-5 border-t border-[#DCE5E0] flex flex-col sm:flex-row gap-2.5 sm:justify-end">
          <button
            type="button"
            onClick={onRejectOptional}
            className="min-h-[44px] px-4 py-2.5 rounded-[8px] border border-[#DCE5E0] bg-[#FAF8F3] text-[#202A26] text-xs sm:text-sm font-semibold hover:border-[#0B6856]"
          >
            Rechazar opcionales
          </button>
          <button
            type="button"
            onClick={onAcceptAll}
            className="min-h-[44px] px-4 py-2.5 rounded-[8px] border border-[#DCE5E0] bg-[#FFFFFF] text-[#0B6856] text-xs sm:text-sm font-semibold hover:bg-[#EAF3EF]"
          >
            Aceptar todas
          </button>
          <button
            type="button"
            onClick={() => onSaveCustom({ preferences, analytics, marketing })}
            className="min-h-[44px] px-5 py-2.5 rounded-[8px] bg-[#0B6856] text-[#FFFFFF] text-xs sm:text-sm font-semibold hover:bg-[#08483B]"
          >
            Guardar preferencias
          </button>
        </div>
      </div>
    </div>
  );
}
