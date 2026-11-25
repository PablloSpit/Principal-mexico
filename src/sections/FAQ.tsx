import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../data/landingContent.esMX';

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="preguntas-frecuentes"
      aria-labelledby="faq-heading"
      className="bg-[#FAF8F3] py-20 lg:py-24 border-t border-b border-[#DCE5E0]/70"
    >
      <div className="mx-auto max-w-[920px] px-5 sm:px-8">
        <div className="space-y-3 text-left sm:text-center mb-12">
          <span className="block text-sm font-medium uppercase tracking-[0.75px] text-[#0B6856]">
            Resuelve tus dudas
          </span>
          <h2
            id="faq-heading"
            className="font-display text-3xl sm:text-[38px] font-bold leading-[1.2] tracking-[-0.5px] text-[#202A26]"
          >
            Preguntas frecuentes
          </h2>
          <p className="text-base text-[#626C67] max-w-xl sm:mx-auto leading-relaxed">
            Información clara sobre el formato del e-book, su alcance educativo, pago único y entrega digital en Cakto.
          </p>
        </div>

        <div className="bg-[#FFFFFF] rounded-[11px] border border-[#DCE5E0] px-5 sm:px-8 divide-y divide-[#DCE5E0]">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            const panelId = `${item.id}-panel`;
            const buttonId = `${item.id}-button`;

            return (
              <div key={item.id}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(item.id)}
                    className="w-full min-h-[58px] py-5 flex items-center justify-between gap-4 text-left text-base sm:text-lg font-semibold text-[#202A26] hover:text-[#0B6856] transition-colors"
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      size={18}
                      strokeWidth={1.85}
                      aria-hidden="true"
                      className={`shrink-0 text-[#0B6856] transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className="pb-5 pr-8 text-sm sm:text-base text-[#626C67] leading-relaxed"
                >
                  {item.answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
