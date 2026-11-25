import { ArrowLeft } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { getLegalDocuments } from '../data/legalContent.esMX';
import type { AppRoutePath, LegalRoutePath } from '../types/site';

interface LegalPageProps {
  route: LegalRoutePath;
  onNavigate: (route: AppRoutePath) => void;
  onOpenCookiePreferences: () => void;
}

const LEGAL_NAV: Array<{ path: LegalRoutePath; label: string }> = [
  { path: '/aviso-de-privacidad', label: 'Aviso de privacidad' },
  { path: '/terminos-y-condiciones', label: 'Términos y condiciones' },
  { path: '/politica-de-cookies', label: 'Política de cookies' },
  { path: '/cancelaciones-y-reembolsos', label: 'Cancelaciones y reembolsos' },
  { path: '/aviso-legal-y-salud', label: 'Aviso legal y de salud' },
];

export function LegalPage({
  route,
  onNavigate,
  onOpenCookiePreferences,
}: LegalPageProps) {
  const docs = getLegalDocuments(siteConfig);
  const doc = docs[route];

  return (
    <main className="bg-[#FAF8F3] min-h-[75vh] py-12 sm:py-16">
      <div className="mx-auto max-w-[920px] px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/');
            }}
            className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-[8px] border border-[#DCE5E0] bg-[#FFFFFF] text-sm font-semibold text-[#0B6856] hover:border-[#0B6856] transition-colors"
          >
            <ArrowLeft size={16} strokeWidth={1.75} />
            Volver a la página principal
          </a>

          {route === '/politica-de-cookies' && (
            <button
              type="button"
              onClick={onOpenCookiePreferences}
              className="min-h-[44px] px-4 py-2 rounded-[8px] bg-[#0B6856] text-[#FFFFFF] text-sm font-semibold hover:bg-[#08483B] transition-colors"
            >
              Configurar cookies
            </button>
          )}
        </div>

        <article className="bg-[#FFFFFF] border border-[#DCE5E0] rounded-[14px] p-6 sm:p-10 lg:p-12">
          <header className="pb-6 border-b border-[#DCE5E0]">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0B6856]">
              Documentación informativa · México
            </p>
            <h1 className="mt-2 font-display text-3xl sm:text-4xl font-semibold text-[#202A26]">
              {doc.title}
            </h1>
            <p className="mt-3 text-base text-[#626C67] leading-relaxed">
              {doc.subtitle}
            </p>
          </header>

          <div className="mt-8 space-y-8">
            {doc.blocks.map((block) => (
              <section key={block.heading} className="space-y-3">
                <h2 className="font-display text-xl font-semibold text-[#202A26]">
                  {block.heading}
                </h2>
                {block.paragraphs.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="text-sm sm:text-base text-[#202A26]/90 leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
                {block.bullets && (
                  <ul className="space-y-2 pl-5 list-disc text-sm sm:text-base text-[#202A26]/90 leading-relaxed">
                    {block.bullets.map((bullet, bIdx) => (
                      <li key={bIdx}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <footer className="mt-10 pt-6 border-t border-[#DCE5E0] text-xs text-[#626C67] space-y-2">
            <p>
              Nota editorial: los textos legales integran los campos definidos en{' '}
              <code className="font-mono">src/config/siteConfig.ts</code> y deben ser validados por el titular del proyecto con asesoría jurídica antes de la publicación comercial definitiva.
            </p>
          </footer>
        </article>

        <nav
          aria-label="Otros documentos legales"
          className="mt-8 flex flex-wrap gap-2"
        >
          {LEGAL_NAV.map((item) => {
            const active = item.path === route;
            return (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.path);
                }}
                aria-current={active ? 'page' : undefined}
                className={`inline-flex items-center min-h-[40px] px-3.5 py-2 rounded-[8px] text-xs sm:text-sm font-medium border transition-colors ${
                  active
                    ? 'bg-[#08483B] text-[#FFFFFF] border-[#08483B]'
                    : 'bg-[#FFFFFF] text-[#202A26] border-[#DCE5E0] hover:border-[#0B6856]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>
    </main>
  );
}
