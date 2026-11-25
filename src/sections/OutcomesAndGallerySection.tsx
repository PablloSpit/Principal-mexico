import { LANDING_COPY } from '../data/landingContent.esMX';

export function OutcomesAndGallerySection() {
  const { outcomesAndGallery } = LANDING_COPY;

  return (
    <section
      id="beneficios"
      aria-labelledby="outcomes-heading"
      className="bg-[#EAF3EF] grid grid-cols-1 lg:grid-cols-[55fr_45fr] items-center border-t border-b border-[#DCE5E0]/70"
    >
      {/* Columna izquierda 55fr: Matriz 2x2 estilo Omnifood */}
      <div className="px-5 py-16 sm:px-10 sm:py-20 lg:px-20 lg:py-24">
        <span className="block text-sm sm:text-base font-medium uppercase tracking-[0.75px] text-[#0B6856] mb-3">
          {outcomesAndGallery.eyebrow}
        </span>
        <h2
          id="outcomes-heading"
          className="font-display text-3xl sm:text-[38px] lg:text-[44px] font-bold leading-[1.2] tracking-[-0.5px] text-[#202A26] mb-12 lg:mb-16"
        >
          {outcomesAndGallery.title}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-10 lg:gap-y-12">
          {outcomesAndGallery.outcomes.map((item, idx) => (
            <div key={item.title} className="space-y-3">
              <p className="font-display text-base font-semibold text-[#C6A15B] tabular-nums">
                0{idx + 1}
              </p>
              <h3 className="font-display text-xl font-bold text-[#202A26]">
                {item.title}
              </h3>
              <p className="text-base leading-[1.7] text-[#202A26]/85">
                {item.text}
              </p>
              <p className="text-sm font-medium text-[#626C67]">{item.tag}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Columna derecha 45fr: Mosaico visual hover-zoom estilo Omnifood */}
      <div className="p-4 sm:p-6 lg:p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {outcomesAndGallery.galleryTiles.map((tile) => (
          <figure
            key={tile.src}
            className="overflow-hidden rounded-[6px] bg-[#FFFFFF] border border-[#DCE5E0]/70"
          >
            <img
              src={tile.src}
              srcSet={tile.srcSet}
              sizes="(max-width: 1024px) 50vw, 240px"
              width={600}
              height={450}
              alt={tile.alt}
              referrerPolicy="no-referrer"
              loading="lazy"
              className={`block w-full aspect-[4/3] object-cover transition-transform duration-300 hover:scale-110 ${
                tile.isCover ? 'object-top' : 'object-center'
              }`}
            />
          </figure>
        ))}
      </div>
    </section>
  );
}
