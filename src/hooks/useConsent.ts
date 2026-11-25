import { useCallback, useEffect, useState } from 'react';
import type { CookieConsentState } from '../types/site';
import {
  CONSENT_STORAGE_KEY,
  CONSENT_VERSION,
  acceptAllConsent,
  createDefaultConsent,
  parseStoredConsent,
  rejectOptionalConsent,
  serializeConsent,
} from '../lib/consent';
import { syncTrackingScripts } from '../lib/tracking';

export function useConsent() {
  const [consent, setConsent] = useState<CookieConsentState>(() => {
    if (typeof window === 'undefined') {
      return createDefaultConsent();
    }
    try {
      return parseStoredConsent(window.localStorage.getItem(CONSENT_STORAGE_KEY));
    } catch {
      return createDefaultConsent();
    }
  });

  const [preferencesOpen, setPreferencesOpen] = useState(false);

  useEffect(() => {
    syncTrackingScripts(consent);
  }, [consent]);

  const persist = useCallback((next: CookieConsentState) => {
    setConsent(next);
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, serializeConsent(next));
    } catch {
      // Silencio seguro si el almacenamiento local está restringido
    }
  }, []);

  const acceptAll = useCallback(() => {
    persist(acceptAllConsent());
    setPreferencesOpen(false);
  }, [persist]);

  const rejectOptional = useCallback(() => {
    persist(rejectOptionalConsent());
    setPreferencesOpen(false);
  }, [persist]);

  const saveCustom = useCallback(
    (choices: { preferences: boolean; analytics: boolean; marketing: boolean }) => {
      persist({
        version: CONSENT_VERSION,
        decided: true,
        necessary: true,
        preferences: choices.preferences,
        analytics: choices.analytics,
        marketing: choices.marketing,
        updatedAt: new Date().toISOString(),
      });
      setPreferencesOpen(false);
    },
    [persist]
  );

  return {
    consent,
    showBanner: !consent.decided,
    preferencesOpen,
    openPreferences: () => setPreferencesOpen(true),
    closePreferences: () => setPreferencesOpen(false),
    acceptAll,
    rejectOptional,
    saveCustom,
  };
}
