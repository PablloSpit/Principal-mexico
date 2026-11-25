import type { ConsentCategory, CookieConsentState } from '../types/site';

export const CONSENT_STORAGE_KEY = 'pnp_cookie_consent_v1';
export const CONSENT_VERSION = '2026-11-24.1';

export function createDefaultConsent(nowIso: string = new Date().toISOString()): CookieConsentState {
  return {
    version: CONSENT_VERSION,
    decided: false,
    necessary: true,
    preferences: false,
    analytics: false,
    marketing: false,
    updatedAt: nowIso,
  };
}

export function parseStoredConsent(raw: string | null): CookieConsentState {
  if (!raw) {
    return createDefaultConsent();
  }

  try {
    const parsed = JSON.parse(raw) as Partial<CookieConsentState>;
    if (!parsed || parsed.version !== CONSENT_VERSION) {
      return createDefaultConsent();
    }

    return {
      version: CONSENT_VERSION,
      decided: Boolean(parsed.decided),
      necessary: true,
      preferences: Boolean(parsed.preferences),
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
      updatedAt: typeof parsed.updatedAt === 'string' ? parsed.updatedAt : new Date().toISOString(),
    };
  } catch {
    return createDefaultConsent();
  }
}

export function serializeConsent(consent: CookieConsentState): string {
  return JSON.stringify({
    ...consent,
    version: CONSENT_VERSION,
    necessary: true,
  });
}

export function acceptAllConsent(nowIso: string = new Date().toISOString()): CookieConsentState {
  return {
    version: CONSENT_VERSION,
    decided: true,
    necessary: true,
    preferences: true,
    analytics: true,
    marketing: true,
    updatedAt: nowIso,
  };
}

export function rejectOptionalConsent(nowIso: string = new Date().toISOString()): CookieConsentState {
  return {
    version: CONSENT_VERSION,
    decided: true,
    necessary: true,
    preferences: false,
    analytics: false,
    marketing: false,
    updatedAt: nowIso,
  };
}

export function canTrackCategory(
  consent: CookieConsentState,
  category: ConsentCategory
): boolean {
  if (category === 'necessary') {
    return true;
  }
  if (!consent.decided) {
    return false;
  }
  return Boolean(consent[category]);
}
