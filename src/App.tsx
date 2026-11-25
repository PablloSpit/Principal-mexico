import { useEffect } from 'react';
import { CookieConsent } from './components/CookieConsent';
import { CookiePreferences } from './components/CookiePreferences';
import { ExitPopup } from './components/ExitPopup';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { MobileStickyCTA } from './components/MobileStickyCTA';
import { siteConfig } from './config/siteConfig';
import { useActiveRoute } from './hooks/useActiveRoute';
import { useConsent } from './hooks/useConsent';
import { useExitIntent } from './hooks/useExitIntent';
import { isExitOfferReady } from './lib/checkout';
import { trackEvent } from './lib/tracking';
import { LegalPage } from './pages/LegalPage';
import { FAQ } from './sections/FAQ';
import { FeaturedBar } from './sections/FeaturedBar';
import { FinalCTA } from './sections/FinalCTA';
import { HeroSection } from './sections/HeroSection';
import { HowItWorksSection } from './sections/HowItWorksSection';
import { MealsAndContentSection } from './sections/MealsAndContentSection';
import { OutcomesAndGallerySection } from './sections/OutcomesAndGallerySection';
import { PricingSection } from './sections/PricingSection';

export default function App() {
  const { route, navigate } = useActiveRoute();
  const {
    consent,
    showBanner,
    preferencesOpen,
    openPreferences,
    closePreferences,
    acceptAll,
    rejectOptional,
    saveCustom,
  } = useConsent();

  const exitEnabled =
    route === '/' &&
    isExitOfferReady({
      exitOfferEnabled: siteConfig.exitOfferEnabled,
      exitOfferCheckoutUrl: siteConfig.exitOfferCheckoutUrl,
    });

  const { isOpen: exitPopupOpen, close: closeExitPopup } = useExitIntent({
    enabled: exitEnabled,
    onTrigger: () => {
      trackEvent(
        'ExitOfferShown',
        consent,
        { location: 'exit_popup' },
        { oncePerSessionKey: 'exit_offer_shown' }
      );
    },
  });

  useEffect(() => {
    const robotsMeta = document.querySelector('meta[name="robots"]');
    if (robotsMeta) {
      const host = window.location.hostname;
      const isLocalOrPreview =
        host === 'localhost' ||
        host === '127.0.0.1' ||
        host.includes('ais-dev-') ||
        host.includes('ais-pre-');
      robotsMeta.setAttribute(
        'content',
        siteConfig.allowIndexing && !isLocalOrPreview ? 'index, follow' : 'noindex, nofollow'
      );
    }

    if (siteConfig.canonicalOrigin.trim()) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      const cleanOrigin = siteConfig.canonicalOrigin.trim().replace(/\/+$/, '');
      canonical.setAttribute('href', `${cleanOrigin}${route === '/' ? '/' : route}`);
    }
  }, [route]);

  useEffect(() => {
    trackEvent(
      'PageView',
      consent,
      { route },
      { oncePerSessionKey: `pageview:${route}:${consent.updatedAt}` }
    );
    if (route === '/') {
      trackEvent(
        'ViewContent',
        consent,
        { route },
        { oncePerSessionKey: `viewcontent:home:${consent.updatedAt}` }
      );
    }
  }, [route, consent]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#202A26]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:rounded-[8px] focus:bg-[#08483B] focus:text-[#FFFFFF] focus:text-sm focus:font-semibold"
      >
        Ir al contenido principal
      </a>

      <Header route={route} onNavigate={navigate} consent={consent} />

      <div id="main-content" className="flex-1">
        {route === '/' ? (
          <main>
            <HeroSection consent={consent} />
            <FeaturedBar />
            <HowItWorksSection />
            <MealsAndContentSection />
            <OutcomesAndGallerySection />
            <PricingSection consent={consent} />
            <FAQ />
            <FinalCTA consent={consent} />
          </main>
        ) : (
          <LegalPage
            route={route}
            onNavigate={navigate}
            onOpenCookiePreferences={openPreferences}
          />
        )}
      </div>

      <Footer onNavigate={navigate} onOpenCookiePreferences={openPreferences} />

      {route === '/' && (
        <MobileStickyCTA consent={consent} cookieBannerVisible={showBanner} />
      )}

      <CookieConsent
        visible={showBanner}
        onAcceptAll={acceptAll}
        onRejectOptional={rejectOptional}
        onConfigure={openPreferences}
      />

      <CookiePreferences
        isOpen={preferencesOpen}
        consent={consent}
        onClose={closePreferences}
        onAcceptAll={acceptAll}
        onRejectOptional={rejectOptional}
        onSaveCustom={saveCustom}
      />

      <ExitPopup
        isOpen={exitPopupOpen}
        consent={consent}
        onClose={closeExitPopup}
      />
    </div>
  );
}
