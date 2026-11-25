import { useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import { buildCheckoutUrl } from '../lib/checkout';
import { trackEvent } from '../lib/tracking';
import type { CookieConsentState } from '../types/site';

interface CheckoutButtonProps {
  label: string;
  location: string;
  consent: CookieConsentState;
  overrideCheckoutUrl?: string;
  onBeforeNavigate?: () => void;
  variant?: 'primary' | 'secondary' | 'header' | 'offer';
  className?: string;
}

export function CheckoutButton({
  label,
  location,
  consent,
  overrideCheckoutUrl,
  onBeforeNavigate,
  variant = 'primary',
  className = '',
}: CheckoutButtonProps) {
  const [pendingNotice, setPendingNotice] = useState(false);

  const targetBaseUrl = overrideCheckoutUrl ?? siteConfig.checkoutUrl;
  const search = typeof window !== 'undefined' ? window.location.search : '';
  const resolved = buildCheckoutUrl(targetBaseUrl, search);

  const variantClasses: Record<NonNullable<CheckoutButtonProps['variant']>, string> = {
    primary:
      'bg-[#0B6856] text-[#FFFFFF] hover:bg-[#08483B] px-7 py-4 text-sm sm:text-base font-semibold tracking-[0.02em] rounded-[8px]',
    secondary:
      'bg-[#0B6856] text-[#FFFFFF] hover:bg-[#08483B] px-7 py-4 text-sm sm:text-base font-semibold tracking-[0.02em] rounded-[8px]',
    header:
      'bg-[#0B6856] text-[#FFFFFF] hover:bg-[#08483B] px-5 py-2.5 text-sm font-semibold rounded-[8px]',
    offer:
      'bg-[#C6A15B] text-[#202A26] hover:bg-[#FAF8F3] px-8 py-4 text-sm sm:text-base font-bold tracking-[0.02em] rounded-[8px]',
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    trackEvent('CTA_Click', consent, { location });
    if (!resolved.isConfigured) {
      e.preventDefault();
      setPendingNotice(true);
      return;
    }
    trackEvent('CheckoutClick', consent, { location });
    trackEvent('InitiateCheckout', consent, { location });
    onBeforeNavigate?.();
  };

  if (!resolved.isConfigured) {
    return (
      <div className="inline-flex flex-col items-start gap-2">
        <button
          type="button"
          onClick={handleClick}
          className={`inline-flex items-center justify-center min-h-[44px] whitespace-nowrap transition-colors duration-200 ${variantClasses[variant]} ${className}`}
        >
          {label}
        </button>
        {pendingNotice && (
          <p
            role="status"
            className="text-xs text-[#626C67] bg-[#FAF8F3] border border-[#DCE5E0] rounded-[6px] px-3 py-2 max-w-sm"
          >
            Checkout en Cakto pendiente de configuración en <code className="font-mono">src/config/siteConfig.ts</code>.
          </p>
        )}
      </div>
    );
  }

  return (
    <a
      href={resolved.href}
      onClick={handleClick}
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center min-h-[44px] whitespace-nowrap transition-colors duration-200 ${variantClasses[variant]} ${className}`}
    >
      {label}
    </a>
  );
}
