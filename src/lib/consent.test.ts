import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CONSENT_VERSION,
  acceptAllConsent,
  canTrackCategory,
  createDefaultConsent,
  parseStoredConsent,
  rejectOptionalConsent,
  serializeConsent,
} from './consent';

test('default consent keeps optional categories disabled until user decides', () => {
  const state = createDefaultConsent('2026-11-24T00:00:00.000Z');
  assert.equal(state.decided, false);
  assert.equal(canTrackCategory(state, 'necessary'), true);
  assert.equal(canTrackCategory(state, 'preferences'), false);
  assert.equal(canTrackCategory(state, 'analytics'), false);
  assert.equal(canTrackCategory(state, 'marketing'), false);
});

test('acceptAll and rejectOptional update tracking permissions deterministically', () => {
  const accepted = acceptAllConsent('2026-11-24T00:00:00.000Z');
  assert.equal(accepted.decided, true);
  assert.equal(canTrackCategory(accepted, 'analytics'), true);
  assert.equal(canTrackCategory(accepted, 'marketing'), true);

  const rejected = rejectOptionalConsent('2026-11-24T00:00:00.000Z');
  assert.equal(rejected.decided, true);
  assert.equal(canTrackCategory(rejected, 'necessary'), true);
  assert.equal(canTrackCategory(rejected, 'analytics'), false);
  assert.equal(canTrackCategory(rejected, 'marketing'), false);
});

test('parseStoredConsent invalidates stale versions and malformed payloads', () => {
  const valid = serializeConsent(acceptAllConsent('2026-11-24T00:00:00.000Z'));
  const parsed = parseStoredConsent(valid);
  assert.equal(parsed.version, CONSENT_VERSION);
  assert.equal(parsed.analytics, true);

  const stale = JSON.stringify({ version: 'old-version', decided: true, analytics: true });
  const parsedStale = parseStoredConsent(stale);
  assert.equal(parsedStale.decided, false);
  assert.equal(parsedStale.analytics, false);

  const corrupted = parseStoredConsent('{invalid-json');
  assert.equal(corrupted.decided, false);
});
