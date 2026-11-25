import { Check, Leaf, ShieldCheck, SlidersHorizontal, Smartphone, X } from 'lucide-react';
import { CheckoutButton } from '../components/CheckoutButton';
import { siteConfig } from '../config/siteConfig';
import { LANDING_COPY } from '../data/landingContent.esMX';
import { formatMxnPrice, formatUsdPrice } from '../lib/checkout';
import type { CookieConsentState } from '../types/site';

interface PricingSectionProps {
  consent: CookieConsentState;
}

function FeatureCircleIcon({ name }: { name: string }) {
  const props = { size: 28, strokeWidth: 1.85, className: 'text-[#0B6856]', 'aria-hidden': true as const };
  switch (name) {
    case 'shield':
      return <ShieldCheck {...props} />;
    case 'leaf':
      return <Leaf {...props} />;
    case 'sliders':
      return <SlidersHorizontal {...props} />;
    default:
      return <Smartphone {...props} />;
  }
}

export function PricingSection({ consent }: PricingSectionProps) {
  const { pricing } = LANDING_COPY;
  const mxnFormatted = formatMxnPrice(siteConfig.priceMXN);

  return (
    <section
      id="precio"
      aria-labelledby="pricing-heading"
      className="bg-[#FFFFFF] py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="mb-14 lg:mb-20">
          <span className="block text-sm sm:text-base font-medium uppercase tracking-[0.75px] text-[#0B6856] mb-3">
            {pricing.eyebrow}
          </span>
          <h2
            id="pricing-heading"
            className="font-display text-3xl sm:text-[38px] lg:text-[44px] font-bold leading-[1.2] tracking-[-0.5px] text-[#202A26]"
          >
            {pricing.title}
          </h2>
        </div>

        {/* Grilla de 2 tarjetas estilo .section-pricing de Omnifood */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 max-w-[920px] mx-auto mb-12">
          {/* Tarjeta izquierda: Claridad de alcance (.pricing-plan--starter) */}
          <div className="rounded-[11px] border-2 border-[#EAF3EF] bg-[#FFFFFF] p-8 sm:p-11 flex flex-col justify-between">
            <div>
              <header className="text-center mb-10">
                <p className="text-[#0B6856] font-semibold text-lg uppercase tracking-[0.75px] mb-5">
                  {pricing.audienceCard.name}
                </p>
                <p className="font-display text-4xl sm:text-[44px] font-bold text-[#202A26] leading-tight mb-3">
                  {pricing.audienceCard.headline}
                </p>
                <p className="text-sm sm:text-base text-[#626C67] leading-relaxed">
                  {pricing.audienceCard.subtitle}
                </p>
              </header>

              <ul className="space-y-4 list-none m-0 p-0">
                {pricing.audienceCard.items.map((item) => (
                  <li
                    key={item.text}
                    className="flex items-center gap-3.5 text-base text-[#202A26]/90 leading-[1.35]"
                  >
                    {item.included ? (
                      <Check
                        size={22}
                        strokeWidth={2.2}
                        aria-hidden="true"
                        className="text-[#0B6856] shrink-0"
                      />
                    ) : (
                      <X
                        size={22}
                        strokeWidth={2}
                        aria-hidden="true"
                        className="text-[#626C67] shrink-0"
                      />
                    )}
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center mt-10">
              <a
                href="#preguntas-frecuentes"
                className="inline-flex items-center justify-center min-h-[44px] w-full sm:w-auto px-8 py-3.5 rounded-[9px] bg-[#EAF3EF] text-[#08483B] hover:bg-[#08483B] hover:text-[#FFFFFF] font-semibold text-base transition-colors"
              >
                {pricing.audienceCard.ctaLabel}
              </a>
            </div>
          </div>

          {/* Tarjeta derecha: Oferta principal con listón dorado (.pricing-plan--complete) */}
          <div className="omnifood-plan-ribbon relative overflow-hidden rounded-[11px] bg-[#EAF3EF] border border-[#DCE5E0] p-8 sm:p-11 flex flex-col justify-between">
            <div>
              <header className="text-center mb-10">
                <p className="text-[#08483B] font-semibold text-lg uppercase tracking-[0.75px] mb-5">
                  {pricing.offerCard.name}
                </p>
                <p className="font-display text-5xl sm:text-[56px] font-bold text-[#202A26] tabular-nums leading-none mb-3">
                  {formatUsdPrice(siteConfig.priceUSD)}
                </p>
                {mxnFormatted ? (
                  <p className="text-sm font-semibold text-[#0B6856] tabular-nums mb-1">
                    Equivalente validado: {mxnFormatted} MXN
                  </p>
                ) : null}
                <p className="text-sm sm:text-base text-[#626C67] leading-relaxed">
                  {pricing.offerCard.subtitle}
                </p>
              </header>

              <ul className="space-y-4 list-none m-0 p-0">
                {pricing.offerCard.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3.5 text-base text-[#202A26] leading-[1.35]"
                  >
                    <Check
                      size={22}
                      strokeWidth={2.2}
                      aria-hidden="true"
                      className="text-[#0B6856] shrink-0"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center mt-10">
              <CheckoutButton
                label={pricing.offerCard.ctaLabel}
                location="offer_section"
                consent={consent}
                variant="primary"
                className="w-full !rounded-[9px] !py-4 !text-base"
              />
            </div>
          </div>
        </div>

        {/* Nota legal y transparencia MXN */}
        <aside className="max-w-[780px] mx-auto text-center text-sm sm:text-base text-[#626C67] leading-[1.6] mb-16 lg:mb-20">
          {pricing.asideNote}
        </aside>

        {/* Grilla inferior de 4 pilares con íconos circulares estilo Omnifood */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {pricing.features.map((feat) => (
            <div key={feat.title} className="space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#EAF3EF]">
                <FeatureCircleIcon name={feat.icon} />
              </div>
              <h3 className="font-display text-xl sm:text-[22px] font-bold text-[#202A26]">
                {feat.title}
              </h3>
              <p className="text-base leading-[1.7] text-[#626C67]">
                {feat.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
