import { LANDING_COPY } from '../data/landingContent.esMX';

export function FeaturedBar() {
  const { featuredBar } = LANDING_COPY;

  return (
    <section
      aria-label={featuredBar.heading}
      className="bg-[#FFFFFF] pt-12 pb-8 border-b border-[#DCE5E0]/50"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <h2 className="text-xs sm:text-sm uppercase tracking-[0.75px] font-medium text-center text-[#626C67] mb-7">
          {featuredBar.heading}
        </h2>
        <div className="flex flex-wrap items-center justify-around gap-x-8 gap-y-4 text-center">
          {featuredBar.items.map((item) => (
            <span
              key={item}
              className="font-display text-sm sm:text-base font-semibold tracking-tight text-[#202A26]/65"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
