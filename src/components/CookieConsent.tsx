interface CookieConsentProps {
  visible: boolean;
  onAcceptAll: () => void;
  onRejectOptional: () => void;
  onConfigure: () => void;
}

export function CookieConsent({
  visible,
  onAcceptAll,
  onRejectOptional,
  onConfigure,
}: CookieConsentProps) {
  if (!visible) {
    return null;
  }

  return (
    <aside
      aria-label="Aviso de cookies"
      className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-6 lg:left-auto lg:right-8 lg:max-w-[540px] z-50 bg-[#FFFFFF] border border-[#DCE5E0] rounded-[12px] p-4 sm:p-5 shadow-[0_20px_50px_-15px_rgba(32,42,38,0.2)]"
    >
      <div className="space-y-4">
        <div className="space-y-1.5">
          <p className="font-display text-base font-semibold text-[#202A26]">
            Tu privacidad y preferencias de cookies
          </p>
          <p className="text-xs sm:text-sm text-[#626C67] leading-relaxed">
            Utilizamos cookies para ofrecerte una mejor experiencia y, con tu autorización, analizar el rendimiento de nuestro sitio y personalizar la publicidad. Puedes configurar tus preferencias en cualquier momento.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2.5">
          <button
            type="button"
            onClick={onAcceptAll}
            className="min-h-[44px] px-5 py-2.5 rounded-[8px] bg-[#0B6856] text-[#FFFFFF] text-xs sm:text-sm font-semibold hover:bg-[#08483B] transition-colors whitespace-nowrap"
          >
            Aceptar todas
          </button>
          <button
            type="button"
            onClick={onRejectOptional}
            className="min-h-[44px] px-5 py-2.5 rounded-[8px] border border-[#DCE5E0] bg-[#FAF8F3] text-[#202A26] text-xs sm:text-sm font-semibold hover:border-[#0B6856] transition-colors whitespace-nowrap"
          >
            Rechazar opcionales
          </button>
          <button
            type="button"
            onClick={onConfigure}
            className="min-h-[44px] px-4 py-2.5 rounded-[8px] border border-transparent text-[#0B6856] text-xs sm:text-sm font-semibold hover:bg-[#EAF3EF] transition-colors whitespace-nowrap"
          >
            Configurar
          </button>
        </div>
      </div>
    </aside>
  );
}
