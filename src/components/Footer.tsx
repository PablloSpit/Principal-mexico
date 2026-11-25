import { siteConfig } from '../config/siteConfig';
import { LANDING_COPY } from '../data/landingContent.esMX';
import type { AppRoutePath, LegalRoutePath } from '../types/site';
import { BrandMark } from './BrandMark';

interface FooterProps {
  onNavigate: (route: AppRoutePath, hash?: string) => void;
  onOpenCookiePreferences: () => void;
}

const PRIVACY_LINKS: Array<{ label: string; path: LegalRoutePath }> = [
  { label: 'Aviso de privacidad', path: '/aviso-de-privacidad' },
  { label: 'Política de cookies', path: '/politica-de-cookies' },
];

const LEGAL_LINKS: Array<{ label: string; path: LegalRoutePath }> = [
  { label: 'Términos y condiciones', path: '/terminos-y-condiciones' },
  { label: 'Cancelaciones y reembolsos', path: '/cancelaciones-y-reembolsos' },
  { label: 'Aviso legal y de salud', path: '/aviso-legal-y-salud' },
];

export function Footer({ onNavigate, onOpenCookiePreferences }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const displayBrand = siteConfig.brandName.trim() || siteConfig.editorialLabel;
  const legalOwner = siteConfig.legalName.trim() || 'Responsable comercial por configurar en siteConfig';
  const businessAddress = siteConfig.businessAddress.trim() || 'Domicilio comercial por configurar antes de publicación';
  const taxId = siteConfig.taxId.trim() || 'Identificación fiscal por configurar antes de publicación';
  const supportEmail = siteConfig.supportEmail.trim();

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const hash = href.replace(/^#/, '');
    onNavigate('/', hash);
    if (typeof window !== 'undefined' && window.location.pathname === '/') {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      id="site-footer"
      className="bg-[#FFFFFF] border-t border-[#DCE5E0] py-20 lg:py-24"
    >
      {/* Grilla exacta de 5 columnas estilo Omnifood: 1.5fr 1.5fr 1fr 1fr 1fr */}
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 grid grid-cols-2 sm:grid-cols-6 lg:grid-cols-[1.5fr_1.5fr_1fr_1fr_1fr] gap-x-8 gap-y-12">
        {/* Columna 1: Marca, resumen y copyright */}
        <div className="col-span-2 sm:col-span-3 lg:col-span-1 flex flex-col justify-between gap-6 order-4 lg:order-none">
          <div className="space-y-4">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/');
              }}
              className="inline-block"
              aria-label="Volver al inicio"
            >
              <BrandMark variant="light" />
            </a>
            <p className="text-xs text-[#626C67] leading-relaxed">
              {siteConfig.productName}. Guía educativa en PDF diseñada para organizar comidas y hábitos en México.
            </p>
          </div>
          <p className="text-xs text-[#626C67] leading-relaxed">
            Copyright © {currentYear} {displayBrand}. Todos los derechos reservados.
          </p>
        </div>

        {/* Columna 2: Datos del responsable comercial */}
        <div className="col-span-2 sm:col-span-3 lg:col-span-1 space-y-5 order-5 lg:order-none">
          <p className="text-base font-semibold text-[#202A26]">Contacto y titular</p>
          <address className="not-italic text-sm text-[#626C67] leading-relaxed space-y-3">
            <p>{legalOwner}</p>
            <p>{businessAddress}</p>
            <p>RFC / ID: {taxId}</p>
            <p>
              {supportEmail ? (
                <a
                  href={`mailto:${supportEmail}`}
                  className="text-[#0B6856] hover:text-[#08483B] underline underline-offset-2 transition-colors"
                >
                  {supportEmail}
                </a>
              ) : (
                'Correo de soporte por configurar'
              )}
              {siteConfig.supportPhone.trim() && (
                <>
                  <br />
                  <span>{siteConfig.supportPhone.trim()}</span>
                </>
              )}
            </p>
          </address>
        </div>

        {/* Columna 3: Guía y navegación */}
        <nav aria-label="Secciones de la guía" className="col-span-2 sm:col-span-2 lg:col-span-1 space-y-5">
          <p className="text-base font-semibold text-[#202A26]">Guía</p>
          <ul className="space-y-3.5 text-sm text-[#626C67] list-none m-0 p-0">
            {LANDING_COPY.header.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleAnchor(e, link.href)}
                  className="hover:text-[#0B6856] transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Columna 4: Privacidad */}
        <nav aria-label="Privacidad" className="col-span-1 sm:col-span-2 lg:col-span-1 space-y-5">
          <p className="text-base font-semibold text-[#202A26]">Privacidad</p>
          <ul className="space-y-3.5 text-sm text-[#626C67] list-none m-0 p-0">
            {PRIVACY_LINKS.map((item) => (
              <li key={item.path}>
                <a
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(item.path);
                  }}
                  className="hover:text-[#0B6856] transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={onOpenCookiePreferences}
                className="text-left text-[#0B6856] hover:text-[#08483B] underline underline-offset-2 transition-colors"
              >
                Preferencias de cookies
              </button>
            </li>
          </ul>
        </nav>

        {/* Columna 5: Información legal */}
        <nav aria-label="Información legal" className="col-span-1 sm:col-span-2 lg:col-span-1 space-y-5">
          <p className="text-base font-semibold text-[#202A26]">Legal</p>
          <ul className="space-y-3.5 text-sm text-[#626C67] list-none m-0 p-0">
            {LEGAL_LINKS.map((item) => (
              <li key={item.path}>
                <a
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(item.path);
                  }}
                  className="hover:text-[#0B6856] transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
