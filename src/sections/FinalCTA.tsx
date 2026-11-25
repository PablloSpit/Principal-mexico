import { CheckoutButton } from '../components/CheckoutButton';
import { LANDING_COPY } from '../data/landingContent.esMX';
import type { CookieConsentState } from '../types/site';

interface FinalCTAProps {
  consent: CookieConsentState;
}

export function FinalCTA({ consent }: FinalCTAProps) {
  const { finalCta } = LANDING_COPY;

  return (
    <section
      aria-labelledby="final-cta-heading"
      className="bg-[#FFFFFF] pt-10 pb-20 lg:pt-14 lg:pb-28"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        {/* Tarjeta dividida 2fr 1fr estilo .cta de Omnifood adaptada a esmeralda y dorado */}
        <div className="rounded-[11px] overflow-hidden shadow-[0_24px_48px_rgba(0,0,0,0.14)] bg-gradient-to-br from-[#0B6856] to-[#08483B] grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-8 p-8 sm:p-12 lg:p-16 text-[#FAF8F3] flex flex-col justify-center">
            <h2
              id="final-cta-heading"
              className="font-display text-3xl sm:text-[38px] lg:text-[42px] font-bold leading-[1.18] tracking-[-0.5px] text-[#FFFFFF] mb-6"
            >
              {finalCta.title}
            </h2>
            <p className="text-base sm:text-[18px] leading-[1.75] text-[#EAF3EF] mb-8 max-w-2xl">
              {finalCta.text}
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <CheckoutButton
                label={finalCta.ctaLabel}
                location="final_cta"
                consent={consent}
                variant="offer"
                className="w-full sm:w-auto !rounded-[9px]"
              />
              <span className="text-xs sm:text-sm text-[#EAF3EF]/85 font-medium">
                {finalCta.note}
              </span>
            </div>
          </div>

          <div className="md:col-span-4 relative min-h-[260px] order-first md:order-none">
            <img
              src="/images/editorial/calm-table.webp"
              srcSet="/images/editorial/calm-table-720w.webp 720w, /images/editorial/calm-table.webp 1400w"
              sizes="(max-width: 768px) 100vw, 420px"
              width={1400}
              height={788}
              alt={finalCta.photoAlt}
              referrerPolicy="no-referrer"
              loading="lazy"
              className="block w-full h-full object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-br from-[#0B6856]/30 to-[#08483B]/40 pointer-events-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
