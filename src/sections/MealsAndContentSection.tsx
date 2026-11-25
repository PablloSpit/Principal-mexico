import {
  BookOpen,
  Calendar,
  Check,
  Leaf,
  RefreshCw,
  ShoppingBag,
  Utensils,
} from 'lucide-react';
import { LANDING_COPY } from '../data/landingContent.esMX';

function AttributeIcon({ name }: { name: string }) {
  const props = { size: 22, strokeWidth: 1.85, className: 'text-[#0B6856] shrink-0', 'aria-hidden': true as const };
  switch (name) {
    case 'calendar':
      return <Calendar {...props} />;
    case 'utensils':
      return <Utensils {...props} />;
    case 'leaf':
      return <Leaf {...props} />;
    case 'shopping':
      return <ShoppingBag {...props} />;
    case 'refresh':
      return <RefreshCw {...props} />;
    default:
      return <BookOpen {...props} />;
  }
}

export function MealsAndContentSection() {
  const { mealsAndContent } = LANDING_COPY;

  return (
    <section
      id="contenido"
      aria-labelledby="meals-content-heading"
      className="bg-[#FFFFFF] py-20 lg:py-24 border-t border-[#DCE5E0]/50"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="text-center mb-14 lg:mb-20">
          <span className="block text-sm sm:text-base font-medium uppercase tracking-[0.75px] text-[#0B6856] mb-3">
            {mealsAndContent.eyebrow}
          </span>
          <h2
            id="meals-content-heading"
            className="font-display text-3xl sm:text-[38px] lg:text-[44px] font-bold leading-[1.2] tracking-[-0.5px] text-[#202A26]"
          >
            {mealsAndContent.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16 items-start mb-12">
          {mealsAndContent.cards.map((card) => (
            <article
              key={card.id}
              className="rounded-[11px] bg-[#FFFFFF] border border-[#DCE5E0]/60 shadow-[0_24px_48px_rgba(0,0,0,0.075)] hover:-translate-y-3 hover:shadow-[0_32px_64px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden"
            >
              <img
                src={card.imageSrc}
                srcSet={card.imageSrcSet}
                sizes="(max-width: 768px) 100vw, 380px"
                width={1200}
                height={900}
                alt={card.imageAlt}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="block w-full aspect-[4/3] object-cover"
              />

              <div className="p-8 sm:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#0B6856] mb-2">
                  {card.category}
                </p>
                <h3 className="font-display text-2xl font-bold text-[#202A26] mb-7">
                  {card.title}
                </h3>
                <ul className="space-y-4 list-none m-0 p-0">
                  {card.attributes.map((attr) => (
                    <li
                      key={attr.bold}
                      className="flex items-center gap-3.5 text-base sm:text-[17px] text-[#626C67]"
                    >
                      <AttributeIcon name={attr.icon} />
                      <span>
                        <strong className="font-semibold text-[#202A26]">
                          {attr.bold}
                        </strong>{' '}
                        {attr.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}

          {/* Tercera columna: Lista de verificación estilo .diets de Omnifood */}
          <div className="md:col-span-2 lg:col-span-1 md:justify-self-center lg:justify-self-stretch">
            <h3 className="font-display text-2xl sm:text-[28px] font-bold leading-[1.2] text-[#202A26] mb-7">
              {mealsAndContent.checklistTitle}
            </h3>
            <ul className="space-y-4 list-none m-0 p-0">
              {mealsAndContent.checklistItems.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3.5 text-base sm:text-[17px] text-[#202A26]/90 leading-[1.3]"
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
        </div>

        <div className="text-center">
          <a
            href="#precio"
            className="inline-block text-base sm:text-[18px] font-medium text-[#0B6856] hover:text-[#08483B] border-b border-current hover:border-transparent pb-0.5 transition-all"
          >
            {mealsAndContent.bottomLinkLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
