export type LegalRoutePath =
  | '/aviso-de-privacidad'
  | '/terminos-y-condiciones'
  | '/politica-de-cookies'
  | '/cancelaciones-y-reembolsos'
  | '/aviso-legal-y-salud';

export type AppRoutePath = '/' | LegalRoutePath;

export interface SiteConfig {
  brandName: string;
  editorialLabel: string;
  legalName: string;
  businessAddress: string;
  taxId: string;
  supportEmail: string;
  supportPhone: string;
  canonicalOrigin: string;
  allowIndexing: boolean;
  productName: string;
  productFormat: string;
  productPageCount: number;
  locale: 'es-MX';
  targetCountry: 'MX';
  priceUSD: number;
  priceMXN: number | null;
  checkoutUrl: string;
  deliveryTerms: string;
  refundTerms: string;
  metaPixelId: string;
  googleAnalyticsId: string;
  googleAdsId: string;
  googleTagManagerId: string;
  exitOfferEnabled: boolean;
  exitOfferCheckoutUrl: string;
  exitOfferDiscountPercent: number;
  exitOfferDiscountedPriceUSD: number;
  legalUpdatedAt: string;
}

export interface CookieConsentState {
  version: string;
  decided: boolean;
  necessary: true;
  preferences: boolean;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
}

export type ConsentCategory = 'necessary' | 'preferences' | 'analytics' | 'marketing';

export type TrackingEventName =
  | 'PageView'
  | 'ViewContent'
  | 'CTA_Click'
  | 'CheckoutClick'
  | 'InitiateCheckout'
  | 'ExitOfferShown'
  | 'ExitOfferAccepted';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
