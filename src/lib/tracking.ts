import { siteConfig } from '../config/siteConfig';
import type { CookieConsentState, TrackingEventName } from '../types/site';
import { canTrackCategory } from './consent';

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

const injectedScripts = new Set<string>();
const firedSessionOnceEvents = new Set<string>();

function loadScriptOnce(id: string, src: string): void {
  if (typeof document === 'undefined' || injectedScripts.has(id)) {
    return;
  }
  if (document.getElementById(id)) {
    injectedScripts.add(id);
    return;
  }
  const script = document.createElement('script');
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
  injectedScripts.add(id);
}

/**
 * Carga condicional de rastreadores únicamente cuando el visitante otorgó
 * consentimiento explícito para la categoría correspondiente y el ID está configurado.
 */
export function syncTrackingScripts(consent: CookieConsentState): void {
  if (typeof window === 'undefined') {
    return;
  }

  const allowAnalytics = canTrackCategory(consent, 'analytics');
  const allowMarketing = canTrackCategory(consent, 'marketing');

  if (allowAnalytics && siteConfig.googleAnalyticsId.trim()) {
    const gaId = siteConfig.googleAnalyticsId.trim();
    window.dataLayer = window.dataLayer || [];
    window.gtag =
      window.gtag ||
      function gtag(...args: unknown[]) {
        window.dataLayer?.push(args as unknown as Record<string, unknown>);
      };
    loadScriptOnce(
      'ga4-script',
      `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`
    );
    window.gtag('js', new Date());
    window.gtag('config', gaId, { anonymize_ip: true });
  }

  if (allowMarketing && siteConfig.googleAdsId.trim()) {
    const adsId = siteConfig.googleAdsId.trim();
    window.dataLayer = window.dataLayer || [];
    window.gtag =
      window.gtag ||
      function gtag(...args: unknown[]) {
        window.dataLayer?.push(args as unknown as Record<string, unknown>);
      };
    loadScriptOnce(
      'gads-script',
      `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(adsId)}`
    );
    window.gtag('config', adsId);
  }

  if ((allowAnalytics || allowMarketing) && siteConfig.googleTagManagerId.trim()) {
    const gtmId = siteConfig.googleTagManagerId.trim();
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    loadScriptOnce(
      'gtm-script',
      `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`
    );
  }

  if (allowMarketing && siteConfig.metaPixelId.trim()) {
    const pixelId = siteConfig.metaPixelId.trim();
    if (!window.fbq) {
      const fbqFn = function (...args: unknown[]) {
        (fbqFn as unknown as { queue: unknown[] }).queue.push(args);
      };
      (fbqFn as unknown as { queue: unknown[]; loaded: boolean; version: string }).queue = [];
      (fbqFn as unknown as { loaded: boolean }).loaded = true;
      (fbqFn as unknown as { version: string }).version = '2.0';
      window.fbq = fbqFn;
    }
    loadScriptOnce('meta-pixel-script', 'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', pixelId);
  }
}

export interface SafeTrackingPayload {
  location?: string;
  section?: string;
  route?: string;
}

/**
 * Envía eventos de campaña permitidos sin datos personales ni atributos sensibles de salud.
 * Nunca dispara eventos Purchase desde el frontend al hacer clic en el botón de compra.
 */
export function trackEvent(
  eventName: TrackingEventName,
  consent: CookieConsentState,
  payload: SafeTrackingPayload = {},
  options: { oncePerSessionKey?: string } = {}
): void {
  if (typeof window === 'undefined') {
    return;
  }

  if (options.oncePerSessionKey) {
    if (firedSessionOnceEvents.has(options.oncePerSessionKey)) {
      return;
    }
    firedSessionOnceEvents.add(options.oncePerSessionKey);
  }

  const allowAnalytics = canTrackCategory(consent, 'analytics');
  const allowMarketing = canTrackCategory(consent, 'marketing');

  if (!allowAnalytics && !allowMarketing) {
    return;
  }

  // Parámetros neutros permitidos (sin referencias médicas, peso ni datos personales)
  const safeMeta = {
    content_name: siteConfig.productName,
    content_category: 'Guía Digital',
    currency: 'USD',
    value: siteConfig.priceUSD,
    placement: payload.location ?? 'landing',
  };

  if (window.dataLayer && (allowAnalytics || allowMarketing)) {
    window.dataLayer.push({
      event: eventName,
      placement: safeMeta.placement,
      route: payload.route ?? window.location.pathname,
    });
  }

  if (window.gtag && allowAnalytics && siteConfig.googleAnalyticsId.trim()) {
    if (eventName === 'PageView') {
      window.gtag('event', 'page_view', { page_path: payload.route ?? window.location.pathname });
    } else if (eventName === 'InitiateCheckout') {
      window.gtag('event', 'begin_checkout', {
        currency: 'USD',
        value: siteConfig.priceUSD,
      });
    } else {
      window.gtag('event', eventName, {
        placement: safeMeta.placement,
      });
    }
  }

  if (window.fbq && allowMarketing && siteConfig.metaPixelId.trim()) {
    if (eventName === 'PageView' || eventName === 'ViewContent' || eventName === 'InitiateCheckout') {
      window.fbq('track', eventName, safeMeta);
    } else {
      window.fbq('trackCustom', eventName, { placement: safeMeta.placement });
    }
  }
}
