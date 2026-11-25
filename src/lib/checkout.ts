const ALLOWED_ATTRIBUTION_PARAMS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'fbclid',
  'gclid',
  'wbraid',
  'gbraid',
  'ttclid',
  'msclkid',
  'sck',
  'src',
] as const;

export interface CheckoutLinkResult {
  isConfigured: boolean;
  href: string;
  preservedParams: string[];
}

/**
 * Construye de forma segura la URL hacia Cakto preservando únicamente
 * parámetros de atribución publicitaria permitidos (sin datos personales ni sensibles).
 */
export function buildCheckoutUrl(
  baseCheckoutUrl: string,
  currentSearch: string = ''
): CheckoutLinkResult {
  const trimmed = baseCheckoutUrl.trim();
  if (!trimmed) {
    return {
      isConfigured: false,
      href: '',
      preservedParams: [],
    };
  }

  let parsedBase: URL;
  try {
    parsedBase = new URL(trimmed);
  } catch {
    return {
      isConfigured: false,
      href: '',
      preservedParams: [],
    };
  }

  if (parsedBase.protocol !== 'https:' && parsedBase.protocol !== 'http:') {
    return {
      isConfigured: false,
      href: '',
      preservedParams: [],
    };
  }

  const preservedParams: string[] = [];
  if (currentSearch) {
    const incoming = new URLSearchParams(
      currentSearch.startsWith('?') ? currentSearch.slice(1) : currentSearch
    );
    for (const key of ALLOWED_ATTRIBUTION_PARAMS) {
      const value = incoming.get(key);
      if (value && value.trim() && !parsedBase.searchParams.has(key)) {
        // Sanitiza longitud excesiva y descarta valores con formato de correo electrónico
        const cleanValue = value.trim().slice(0, 128);
        if (!cleanValue.includes('@')) {
          parsedBase.searchParams.set(key, cleanValue);
          preservedParams.push(key);
        }
      }
    }
  }

  return {
    isConfigured: true,
    href: parsedBase.toString(),
    preservedParams,
  };
}

export function formatUsdPrice(amount: number): string {
  return `US$ ${amount.toFixed(2)}`;
}

export function formatMxnPrice(amount: number | null): string | null {
  if (amount === null || !Number.isFinite(amount) || amount <= 0) {
    return null;
  }
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function calculateExitDiscountPrice(
  originalUsd: number,
  discountPercent: number
): number {
  const factor = Math.max(0, Math.min(100, discountPercent)) / 100;
  return Math.round(originalUsd * (1 - factor) * 100) / 100;
}

export function isExitOfferReady(params: {
  exitOfferEnabled: boolean;
  exitOfferCheckoutUrl: string;
}): boolean {
  if (!params.exitOfferEnabled) {
    return false;
  }
  return buildCheckoutUrl(params.exitOfferCheckoutUrl).isConfigured;
}
