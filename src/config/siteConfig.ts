import type { SiteConfig } from '../types/site';

/**
 * Configuración comercial, legal y de rastreo centralizada.
 * Antes de publicar comercialmente, completa los campos vacíos con tus datos validados.
 */
export const siteConfig: SiteConfig = {
  brandName: '',
  editorialLabel: 'Plan 30 Días · Nutrición',
  legalName: '',
  businessAddress: '',
  taxId: '',
  supportEmail: '',
  supportPhone: '',
  canonicalOrigin: '',
  allowIndexing: false,
  productName: 'Plan de Nutrición y Pérdida de Peso Saludable en 30 Días',
  productFormat: 'E-book digital en PDF',
  productPageCount: 61,
  locale: 'es-MX',
  targetCountry: 'MX',
  priceUSD: 29.90,
  priceMXN: null,
  checkoutUrl: 'https://pay.cakto.com.br/32z8qdi_1353376',
  deliveryTerms: '',
  refundTerms: '',
  metaPixelId: '',
  googleAnalyticsId: '',
  googleAdsId: '',
  googleTagManagerId: '',
  exitOfferEnabled: false,
  exitOfferCheckoutUrl: '',
  exitOfferDiscountPercent: 10,
  exitOfferDiscountedPriceUSD: 26.91,
  legalUpdatedAt: '24 de noviembre de 2026',
};

export interface PendingConfigItem {
  key: keyof SiteConfig;
  label: string;
  requiredForLaunch: boolean;
}

export function getPendingConfigurations(config: SiteConfig = siteConfig): PendingConfigItem[] {
  const checks: Array<{ key: keyof SiteConfig; label: string; requiredForLaunch: boolean; isMissing: boolean }> = [
    { key: 'brandName', label: 'Nombre comercial de la marca', requiredForLaunch: true, isMissing: !config.brandName.trim() },
    { key: 'legalName', label: 'Razón social o nombre legal del responsable', requiredForLaunch: true, isMissing: !config.legalName.trim() },
    { key: 'businessAddress', label: 'Domicilio comercial completo', requiredForLaunch: true, isMissing: !config.businessAddress.trim() },
    { key: 'taxId', label: 'Identificación fiscal aplicable', requiredForLaunch: true, isMissing: !config.taxId.trim() },
    { key: 'supportEmail', label: 'Correo electrónico de soporte', requiredForLaunch: true, isMissing: !config.supportEmail.trim() },
    { key: 'priceMXN', label: 'Precio validado en pesos mexicanos (MXN)', requiredForLaunch: true, isMissing: config.priceMXN === null },
    { key: 'deliveryTerms', label: 'Condiciones específicas de entrega digital en Cakto', requiredForLaunch: true, isMissing: !config.deliveryTerms.trim() },
    { key: 'refundTerms', label: 'Política y plazos validados de cancelación y reembolso', requiredForLaunch: true, isMissing: !config.refundTerms.trim() },
    { key: 'checkoutUrl', label: 'URL de checkout en Cakto', requiredForLaunch: true, isMissing: !config.checkoutUrl.trim() },
    { key: 'canonicalOrigin', label: 'Dominio canónico de producción', requiredForLaunch: true, isMissing: !config.canonicalOrigin.trim() },
  ];

  return checks
    .filter((item) => item.isMissing)
    .map(({ key, label, requiredForLaunch }) => ({ key, label, requiredForLaunch }));
}
