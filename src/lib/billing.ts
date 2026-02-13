/**
 * Billing abstraction layer.
 * Web mock backed by localStorage — shaped like a real billing SDK
 * (e.g. RevenueCat) so it can be swapped later with zero UI changes.
 */

import { loadState, setProStatus } from "./storage";

export interface Entitlements {
  isPro: boolean;
}

/**
 * Read the current customer entitlements.
 * In production this would hit RevenueCat / StoreKit.
 */
export async function getCustomerEntitlements(): Promise<Entitlements> {
  const state = loadState();
  return { isPro: state.isPro };
}

/**
 * Present the paywall and process a purchase.
 * Returns whether the user completed the purchase.
 * In production this triggers the native paywall sheet.
 */
export async function presentPaywall(): Promise<{ purchased: boolean }> {
  // Web mock: always succeeds (called after user taps a plan button)
  setProStatus(true);
  return { purchased: true };
}

/**
 * Restore previous purchases.
 * In production this calls RevenueCat's restorePurchases().
 */
export async function restorePurchases(): Promise<void> {
  // Web mock: re-read persisted flag (no-op if never purchased)
  const state = loadState();
  if (state.isPro) {
    // already restored
  }
}
