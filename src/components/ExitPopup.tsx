import { useEffect } from 'react';
import { X } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { formatUsdPrice, isExitOfferReady } from '../lib/checkout';
import { trackEvent } from '../lib/tracking';
import type { CookieConsentState } from '../types/site';
import { CheckoutButton } from './CheckoutButton';

interface ExitPopupProps {
  isOpen: boolean;
  consent: CookieConsentState;
  onClose: () => void;
}

export function ExitPopup({ isOpen, consent, onClose }: ExitPopupProps) {
  const ready = isExitOfferReady({
    exitOfferEnabled: siteConfig.exitOfferEnabled,
    exitOfferCheckoutUrl: siteConfig.exitOfferCheckoutUrl,
  });

  useEffect(() => {
    if (!isOpen || !ready) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, ready, onClose]);

  if (!isOpen || !ready) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#202A26]/65 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-offer-title"
    >
      <div className="relative w-full max-w-[480px] bg-[#FAF8F3] border border-[#C6A15B] rounded-[14px] p-6 sm:p-8 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar aviso"
          className="absolute top-4 right-4 inline-flex items-center justify-center w-11 h-11 rounded-[8px] border border-[#DCE5E0] bg-[#FFFFFF] text-[#202A26] hover:border-[#0B6856]"
        >
          <X size={18} strokeWidth={1.75} />
        </button>

        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0B6856]">
          Beneficio disponible en Cakto
        </p>

        <h2
          id="exit-offer-title"
          className="mt-2 font-display text-2xl sm:text-3xl font-semibold text-[#202A26] pr-8"
        >
          ¿Antes de irte?
        </h2>

        <p className="mt-3 text-sm sm:text-base text-[#626C67] leading-relaxed">
          Si todavía estás pensando en comenzar, puedes aprovechar un 10% de descuento en tu plan de alimentación de 30 días.
        </p>

        <div className="mt-5 p-4 rounded-[10px] bg-[#FFFFFF] border border-[#DCE5E0] flex items-baseline justify-between gap-4">
          <div>
            <p className="text-xs text-[#626C67]">Precio habitual</p>
            <p className="text-sm text-[#626C67] line-through tabular-nums">
              {formatUsdPrice(siteConfig.priceUSD)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold text-[#0B6856]">
              Con 10% de descuento
            </p>
            <p className="font-display text-2xl font-bold text-[#202A26] tabular-nums">
              {formatUsdPrice(siteConfig.exitOfferDiscountedPriceUSD)}
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2.5">
          <CheckoutButton
            label="QUIERO APROVECHAR MI DESCUENTO"
            location="exit_popup"
            consent={consent}
            overrideCheckoutUrl={siteConfig.exitOfferCheckoutUrl}
            variant="primary"
            className="w-full text-center"
            onBeforeNavigate={() => {
              trackEvent('ExitOfferAccepted', consent, { location: 'exit_popup' });
              onClose();
            }}
          />
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-4 py-2 text-sm font-medium text-[#626C67] hover:text-[#202A26] transition-colors"
          >
            No, gracias.
          </button>
        </div>
      </div>
    </div>
  );
}
