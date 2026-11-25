import { CheckoutButton } from '../components/CheckoutButton';
import { EbookMockup } from '../components/EbookMockup';
import { siteConfig } from '../config/siteConfig';
import { LANDING_COPY } from '../data/landingContent.esMX';
import { formatUsdPrice } from '../lib/checkout';
import type { CookieConsentState } from '../types/site';

interface HeroSectionProps {
  consent: CookieConsentState;
}

export function HeroSection({ consent }: HeroSectionProps) {
  const { hero } = LANDING_COPY;

  const scrollToHow = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="bg-[#FAF8F3] pt-8 pb-16 sm:pt-12 sm:pb-24 border-b border-[#DCE5E0]/50 overflow-x-clip"
    >
      <div className="mx-auto max-w-[1300px] px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Columna izquierda: Titular, descripción, doble botón estilo Omnifood */}
        <div className="text-center lg:text-left">
          <h1 className="font-display text-[clamp(2.25rem,3.6vw,3.25rem)] font-bold leading-[1.08] tracking-[-0.5px] text-[#202A26] mb-7">
            {hero.headline}
          </h1>

          <p className="text-lg sm:text-[20px] leading-[1.6] text-[#626C67] mb-10 max-w-2xl mx-auto lg:mx-0">
            {hero.subheadline}
          </p>

          <div
            id="hero-cta-anchor"
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
          >
            <CheckoutButton
              label={hero.ctaPrimary}
              location="hero"
              consent={consent}
              variant="primary"
              className="!rounded-[9px] !px-8 !py-4 !text-base sm:!text-lg !font-semibold"
            />
            <a
              href="#como-funciona"
              onClick={scrollToHow}
              className="inline-flex items-center justify-center min-h-[44px] bg-[#FFFFFF] text-[#202A26] hover:bg-[#EAF3EF] shadow-[inset_0_0_0_2px_#DCE5E0] hover:shadow-[inset_0_0_0_3px_#FFFFFF] px-8 py-4 rounded-[9px] text-base sm:text-lg font-semibold transition-all duration-200 whitespace-nowrap"
            >
              {hero.ctaSecondary}
            </a>
          </div>

          <div className="mt-10 lg:mt-14 pt-6 border-t border-[#DCE5E0] flex flex-wrap items-center justify-center lg:justify-start gap-x-2.5 gap-y-1 text-sm sm:text-base font-medium text-[#626C67]">
            <span>{hero.bottomHighlight}</span>
            <span className="inline-flex items-center gap-2 font-bold text-[#0B6856] tabular-nums whitespace-nowrap">
              <span aria-hidden="true" className="text-[#C6A15B]">·</span>
              <span>{formatUsdPrice(siteConfig.priceUSD)}</span>
            </span>
          </div>
        </div>

        {/* Columna derecha: Composición equilibrada con comida mexicana + portada oficial del e-book */}
        <div className="relative mx-auto w-full max-w-[540px] lg:max-w-none">
          <div className="rounded-[11px] overflow-hidden border border-[#DCE5E0] bg-[#EAF3EF] shadow-[0_24px_48px_rgba(0,0,0,0.08)]">
            <img
              src="/images/editorial/hero-meal.webp"
              srcSet="/images/editorial/hero-meal-640w.webp 640w, /images/editorial/hero-meal.webp 1200w"
              sizes="(max-width: 1024px) 100vw, 560px"
              width={1200}
              height={900}
              alt={hero.heroPhotoAlt}
              referrerPolicy="no-referrer"
              loading="eager"
              decoding="sync"
              className="block w-full aspect-[4/3] object-cover"
            />
          </div>

          <div className="mt-6 sm:mt-0 sm:w-[220px] md:w-[240px] sm:mx-auto lg:mx-0 sm:absolute sm:-bottom-6 sm:-left-6">
            <EbookMockup
              mode="book"
              imageSrc="/images/ebook/page-1.webp"
              imageSrcSet="/images/ebook/page-1-600w.webp 600w, /images/ebook/page-1.webp 1200w"
              alt={hero.coverAlt}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
