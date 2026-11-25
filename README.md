# Plan de Nutrición y Pérdida de Peso Saludable en 30 Días — Landing Page (México)

Página de ventas editorial y páginas legales independientes en español mexicano (`es-MX`) para la comercialización de la guía digital en PDF **Plan de Nutrición y Pérdida de Peso Saludable en 30 Días**.

## Estructura del proyecto

- `src/config/siteConfig.ts`: Configuración comercial, legal, de precios, checkout Cakto y rastreo centralizada.
- `src/data/landingContent.esMX.ts`: Textos comerciales, contenido real del e-book, galería y preguntas frecuentes.
- `src/data/legalContent.esMX.ts`: Documentos legales (`/aviso-de-privacidad`, `/terminos-y-condiciones`, `/politica-de-cookies`, `/cancelaciones-y-reembolsos`, `/aviso-legal-y-salud`).
- `src/components/`: Componentes reutilizables (`Header`, `Footer`, `CheckoutButton`, `EbookMockup`, `MobileStickyCTA`, `CookieConsent`, `CookiePreferences`, `ExitPopup`, `BrandMark`).
- `src/sections/`: Secciones modulares de la landing page (`Hero`, `ProblemIdentification`, `ProductPresentation`, `ExperienceSteps`, `ProductBenefits`, `ProductGallery`, `TargetAudience`, `OfferSection`, `FAQ`, `FinalCTA`).
- `src/pages/LegalPage.tsx`: Plantilla común para los documentos legales.
- `src/lib/`: Utilidades puras (`checkout.ts`, `consent.ts`, `tracking.ts`) y pruebas unitarias (`*.test.ts`).
- `public/images/ebook/`: Portada original y páginas reales extraídas del PDF en formato WebP responsivo.
- `public/images/editorial/`: Fotografías gastronómicas en formato WebP responsivo.
- `public/images/og-share.jpg`: Imagen de compartición social de `1200 × 630 px`.

## Configuración comercial y de Cakto

1. Abre `src/config/siteConfig.ts`.
2. Completa los datos del titular antes de publicar:
   - `brandName`
   - `legalName`
   - `businessAddress`
   - `taxId`
   - `supportEmail`
   - `supportPhone` (opcional)
3. Verifica `checkoutUrl` (actualmente configurado en `https://pay.cakto.com.br/32z8qdi_1353376`). Todos los botones de compra leen esta variable mediante `buildCheckoutUrl()` preservando parámetros `utm_*`, `fbclid`, `gclid`, `wbraid`, `gbraid`, `ttclid` y `msclkid` sin enviar datos personales.
4. Define `deliveryTerms` y `refundTerms` exactamente según tus reglas operativas vigentes en Cakto y tu revisión jurídica para México.

## Configuración de precios (USD y MXN)

- `priceUSD`: Precio base (`29.90`).
- `priceMXN`: Inicialmente `null` para no inventar tipos de cambio ni impuestos. Cuando cuentes con un precio comercial validado en pesos mexicanos, asigna el número correspondiente (por ejemplo `589`) y se mostrará automáticamente en la sección de oferta y en los Términos y Condiciones.
- Oferta opcional de salida (`exitOfferEnabled` / `exitOfferCheckoutUrl`): Desactivada por defecto (`false`). Actívala únicamente cuando tengas un cupón o URL promocional de Cakto configurada con el 10% de descuento (`US$ 26.91`) y hayas desactivado cualquier popup duplicado en el checkout de Cakto.

## Inserción o sustitución de imágenes

- Portada y páginas reales del PDF: `public/images/ebook/page-*.webp` y `page-*-600w.webp`.
- Fotografías gastronómicas: `public/images/editorial/*.webp`.
- Imagen Open Graph (`1200 × 630`): `public/images/og-share.jpg`.

## Rastreo y consentimiento de cookies

- Configura en `siteConfig.ts` los identificadores que utilices (`metaPixelId`, `googleAnalyticsId`, `googleAdsId`, `googleTagManagerId`).
- Los scripts permanecen bloqueados hasta que el visitante otorgue consentimiento explícito en el banner o en **Preferencias de privacidad**.
- No se dispara el evento `Purchase` al hacer clic en los botones; `Purchase` debe enviarse exclusivamente tras confirmación real del pago en Cakto.

## Comandos de desarrollo y verificación

```bash
# Ejecutar pruebas unitarias de lógica de checkout y consentimiento
npx --yes tsx --test src/lib/checkout.test.ts src/lib/consent.test.ts

# Verificación de tipos y compilación de producción
npm run lint
npm run build
```

## Publicación e indexación

1. Configura `canonicalOrigin` con tu dominio final en `src/config/siteConfig.ts`.
2. Cambia `allowIndexing: true` en `src/config/siteConfig.ts` y actualiza `<meta name="robots">` en `index.html` y las URLs de `public/sitemap.xml` / `public/robots.txt` solo en el dominio de producción.
3. Revisa y valida todos los textos legales con asesoría jurídica antes de lanzar campañas pagadas en México.
