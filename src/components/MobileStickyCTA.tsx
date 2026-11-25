import { siteConfig } from '../config/siteConfig';
import { useScrollPastHero } from '../hooks/useScrollPastHero';
import { formatUsdPrice } from '../lib/checkout';
import type { CookieConsentState } from '../types/site';
import { CheckoutButton } from './CheckoutButton';

interface MobileStickyCTAProps {
  consent: CookieConsentState;
  cookieBannerVisible: boolean;
}

export function MobileStickyCTA({ consent, cookieBannerVisible }: MobileStickyCTAProps) {
  const pastHero = useScrollPastHero('hero', 'site-footer');

  // Nunca superponer el banner de cookies ni el pie de página
  if (!pastHero || cookieBannerVisible) {
    return null;
  }

  return (
    <div
      className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-[#FFFFFF]/96 backdrop-blur-xs border-t border-[#DCE5E0] px-4 pt-2.5 safe-bottom-pad shadow-[0_-8px_24px_-12px_rgba(32,42,38,0.18)]"
      role="region"
      aria-label="Acceso rápido al plan"
    >
      <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-[#202A26] truncate">
            Plan de 30 Días · PDF
          </p>
          <p className="text-xs text-[#626C67] tabular-nums">
            {formatUsdPrice(siteConfig.priceUSD)} · Pago único
          </p>
        </div>
        <CheckoutButton
          label="Comenzar ahora"
          location="mobile_sticky"
          consent={consent}
          variant="header"
          className="px-4 py-2.5 text-xs sm:text-sm shrink-0"
        />
      </div>
    </div>
  );
}
