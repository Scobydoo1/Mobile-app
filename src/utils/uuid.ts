import * as Crypto from 'expo-crypto';

/** UUID v4 using expo-crypto for cryptographically-strong randomness. */
export function uuid(): string {
  return Crypto.randomUUID();
}
