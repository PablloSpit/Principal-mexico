import { useCallback, useEffect, useState } from 'react';
import type { AppRoutePath, LegalRoutePath } from '../types/site';

const LEGAL_ROUTES: ReadonlySet<string> = new Set<LegalRoutePath>([
  '/aviso-de-privacidad',
  '/terminos-y-condiciones',
  '/politica-de-cookies',
  '/cancelaciones-y-reembolsos',
  '/aviso-legal-y-salud',
]);

function normalizePath(pathname: string): AppRoutePath {
  const cleaned = pathname.replace(/\/+$/, '') || '/';
  if (LEGAL_ROUTES.has(cleaned)) {
    return cleaned as LegalRoutePath;
  }
  return '/';
}

export function useActiveRoute() {
  const [route, setRoute] = useState<AppRoutePath>(() => {
    if (typeof window === 'undefined') {
      return '/';
    }
    return normalizePath(window.location.pathname);
  });

  useEffect(() => {
    const handlePopState = () => {
      setRoute(normalizePath(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((nextRoute: AppRoutePath, hash?: string) => {
    const targetUrl = `${nextRoute}${window.location.search}${hash ? `#${hash.replace(/^#/, '')}` : ''}`;
    window.history.pushState({}, '', targetUrl);
    setRoute(nextRoute);

    if (hash) {
      window.requestAnimationFrame(() => {
        const el = document.getElementById(hash.replace(/^#/, ''));
        el?.scrollIntoView({ behavior: 'smooth' });
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, []);

  return { route, navigate };
}
