import { Fragment } from 'react';
import { EbookMockup } from '../components/EbookMockup';
import { LANDING_COPY } from '../data/landingContent.esMX';

export function HowItWorksSection() {
  const { howItWorks } = LANDING_COPY;

  return (
    <section
      id="como-funciona"
      aria-labelledby="how-heading"
      className="bg-[#FFFFFF] py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <span className="block text-sm sm:text-base font-medium uppercase tracking-[0.75px] text-[#0B6856] mb-3">
          {howItWorks.eyebrow}
        </span>
        <h2
          id="how-heading"
          className="font-display text-3xl sm:text-[38px] lg:text-[44px] font-bold leading-[1.2] tracking-[-0.5px] text-[#202A26] mb-16 lg:mb-24"
        >
          {howItWorks.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-16 lg:gap-y-24 items-center">
          {howItWorks.steps.map((step, index) => {
            const isVisualFirstOnDesktop = index === 1;

            const textNode = (
              <div className="space-y-4">
                <p className="text-[68px] sm:text-[78px] lg:text-[86px] font-semibold leading-none text-[#DCE5E0] tabular-nums mb-3">
                  {step.number}
                </p>
                <h3 className="font-display text-2xl sm:text-[28px] lg:text-[30px] font-bold leading-[1.2] tracking-[-0.4px] text-[#202A26] mb-5">
                  {step.title}
                </h3>
                <p className="text-base sm:text-[18px] leading-[1.75] text-[#626C67]">
                  {step.description}
                </p>
              </div>
            );

            const visualNode = (
              <div
                className={`omnifood-step-visual py-6 ${
                  isVisualFirstOnDesktop ? '' : 'order-first md:order-none'
                }`}
              >
                <div className="w-[54%] max-w-[240px]">
                  <EbookMockup
                    mode="phone"
                    imageSrc={step.imageSrc}
                    imageSrcSet={step.imageSrcSet}
                    alt={step.imageAlt}
                  />
                </div>
              </div>
            );

            return (
              <Fragment key={step.number}>
                {isVisualFirstOnDesktop ? (
                  <>
                    {visualNode}
                    {textNode}
                  </>
                ) : (
                  <>
                    {textNode}
                    {visualNode}
                  </>
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
