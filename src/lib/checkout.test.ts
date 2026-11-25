import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildCheckoutUrl,
  calculateExitDiscountPrice,
  formatMxnPrice,
  formatUsdPrice,
  isExitOfferReady,
} from './checkout';

test('buildCheckoutUrl preserves permitted ad attribution params and strips PII', () => {
  const result = buildCheckoutUrl(
    'https://pay.cakto.com.br/32z8qdi_1353376',
    '?utm_source=meta&utm_medium=cpc&utm_campaign=mx_plan&fbclid=fb123&email=user@test.com&peso=80'
  );

  assert.equal(result.isConfigured, true);
  assert.deepEqual(result.preservedParams, ['utm_source', 'utm_medium', 'utm_campaign', 'fbclid']);
  const parsed = new URL(result.href);
  assert.equal(parsed.searchParams.get('utm_source'), 'meta');
  assert.equal(parsed.searchParams.get('fbclid'), 'fb123');
  assert.equal(parsed.searchParams.get('email'), null);
  assert.equal(parsed.searchParams.get('peso'), null);
});

test('buildCheckoutUrl flags empty or invalid URLs safely', () => {
  assert.equal(buildCheckoutUrl('').isConfigured, false);
  assert.equal(buildCheckoutUrl('not-a-url').isConfigured, false);
  assert.equal(buildCheckoutUrl('javascript:alert(1)').isConfigured, false);
});

test('price formatting and exit discount math stay accurate', () => {
  assert.equal(formatUsdPrice(29.9), 'US$ 29.90');
  assert.equal(calculateExitDiscountPrice(29.9, 10), 26.91);
  assert.equal(formatMxnPrice(null), null);
  assert.match(formatMxnPrice(589) ?? '', /589\.00/);
});

test('isExitOfferReady requires both enabled flag and valid URL', () => {
  assert.equal(isExitOfferReady({ exitOfferEnabled: false, exitOfferCheckoutUrl: 'https://pay.cakto.com.br/promo' }), false);
  assert.equal(isExitOfferReady({ exitOfferEnabled: true, exitOfferCheckoutUrl: '' }), false);
  assert.equal(isExitOfferReady({ exitOfferEnabled: true, exitOfferCheckoutUrl: 'https://pay.cakto.com.br/promo' }), true);
});
