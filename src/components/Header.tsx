import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { LANDING_COPY } from '../data/landingContent.esMX';
import type { AppRoutePath, CookieConsentState } from '../types/site';
import { BrandMark } from './BrandMark';
import { CheckoutButton } from './CheckoutButton';

interface HeaderProps {
  route: AppRoutePath;
  onNavigate: (route: AppRoutePath, hash?: string) => void;
  consent: CookieConsentState;
}

export function Header({ route, onNavigate, consent }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  // Réplica exacta del IntersectionObserver de Omnifood: se vuelve blanco fijo tras salir del Hero
  useEffect(() => {
    if (route !== '/') {
      setIsSticky(false);
      return;
    }

    const heroEl = document.getElementById('hero');
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          setIsSticky(!entry.isIntersecting);
        }
      },
      {
        root: null,
        threshold: 0,
        rootMargin: '-80px 0px 0px 0px',
      }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, [route]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [mobileMenuOpen]);

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const hash = href.replace(/^#/, '');
    if (route !== '/') {
      onNavigate('/', hash);
    } else {
      const target = document.getElementById(hash);
      target?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`w-full transition-colors duration-200 ${
          isSticky
            ? 'fixed top-0 left-0 right-0 z-40 h-[76px] bg-[#FFFFFF]/95 backdrop-blur-xs shadow-[0_12px_32px_rgba(0,0,0,0.04)] border-b border-[#DCE5E0]/70'
            : 'relative z-40 h-[88px] bg-[#FAF8F3]'
        }`}
      >
        <div className="mx-auto max-w-[1360px] px-4 sm:px-8 lg:px-12 h-full flex items-center justify-between gap-6">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setMobileMenuOpen(false);
              onNavigate('/');
            }}
            className="inline-flex items-center min-h-[44px] shrink-0"
            aria-label="Ir al inicio"
          >
            <BrandMark variant="light" />
          </a>

          {/* Navegación principal estilo Omnifood */}
          <nav
            aria-label="Navegación principal"
            className="hidden lg:flex items-center gap-9"
          >
            <ul className="flex items-center gap-9 list-none m-0 p-0">
              {LANDING_COPY.header.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="inline-block text-[17px] font-medium text-[#202A26] hover:text-[#0B6856] transition-colors whitespace-nowrap shrink-0 py-1.5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <CheckoutButton
                  label={LANDING_COPY.header.ctaLabel}
                  location="header"
                  consent={consent}
                  variant="header"
                  className="!rounded-[9px] !px-6 !py-2.5 !text-[16px]"
                />
              </li>
            </ul>
          </nav>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
            className="lg:hidden relative z-50 inline-flex items-center justify-center w-11 h-11 rounded-[9px] text-[#202A26] hover:text-[#0B6856] transition-colors"
          >
            {mobileMenuOpen ? <X size={28} strokeWidth={1.85} /> : <Menu size={28} strokeWidth={1.85} />}
          </button>
        </div>
      </header>

      {/* Compensador de altura cuando el header pasa a position: fixed */}
      {isSticky && <div aria-hidden="true" className="h-[88px]" />}

      {/* Menú móvil pantalla completa con desenfoque estilo Omnifood */}
      <div
        id="mobile-navigation-drawer"
        aria-hidden={!mobileMenuOpen}
        className={`lg:hidden fixed inset-0 z-40 bg-[#FFFFFF]/92 backdrop-blur-md flex flex-col items-center justify-center px-6 transition-all duration-300 ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-x-0 visible'
            : 'opacity-0 pointer-events-none translate-x-full invisible'
        }`}
      >
        <nav aria-label="Navegación móvil" className="w-full max-w-xs text-center">
          <ul className="flex flex-col gap-7 list-none m-0 p-0">
            {LANDING_COPY.header.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="inline-flex items-center justify-center min-h-[44px] text-2xl font-semibold text-[#202A26] hover:text-[#0B6856] transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <CheckoutButton
                label={LANDING_COPY.header.ctaLabel}
                location="header_mobile_menu"
                consent={consent}
                variant="primary"
                className="w-full !rounded-[9px]"
                onBeforeNavigate={() => setMobileMenuOpen(false)}
              />
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
