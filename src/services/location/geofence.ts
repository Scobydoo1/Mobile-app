import * as Location from 'expo-location';

/**
 * Geofencing module.
 *
 * Strategy:
 *  - "Home" is defined either by a stored coordinate (HOME_COORD) or auto-pinned the first time the
 *    app receives a fix while the user is "home" (we'll let the user confirm via a settings flow later).
 *  - We poll location every 60 s while foregrounded. Background polling is best-effort and intentionally
 *    coarse — the UI gets quick updates when foregrounded; background updates land via Notification deep-links.
 *  - On entering/leaving the Home radius we emit `CONTEXT_CHANGED`.
 */

type LocationListener = (place: PlaceFix) => void;

export interface PlaceFix {
  place: string;            // 'Home' | 'On the Move' | 'Unknown'
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
  fixedAt: string;          // ISO timestamp
}

// Mock home coordinate — replace via SettingsScreen once authorised by the user.
// Defaulting to a neutral location so the first-run dev experience still shows "Home"
// when developer overrides via setMockPlace('Home').
let HOME_COORD: { lat: number; lon: number } | null = null;
const HOME_RADIUS_M = 120;

let listeners = new Set<LocationListener>();
let pollHandle: ReturnType<typeof setInterval> | null = null;
let lastFix: PlaceFix = {
  place: 'Home',  // default optimistic state for first paint (matches mockup)
  latitude: null,
  longitude: null,
  accuracy: null,
  fixedAt: new Date().toISOString(),
};

export function getLastFix(): PlaceFix {
  return lastFix;
}

export function onPlaceChange(fn: LocationListener): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function emit(next: PlaceFix) {
  lastFix = next;
  for (const l of listeners) l(next);
}

/** Allow dev/demo to override the resolved place without granting location permission. */
export function setMockPlace(place: 'Home' | 'On the Move' | 'Unknown') {
  emit({ ...lastFix, place, fixedAt: new Date().toISOString() });
}

/** Pin the current device coords as the user's Home. */
export function setHomeCoord(lat: number, lon: number) {
  HOME_COORD = { lat, lon };
}

/**
 * Begin polling. Safe to call once at app start; subsequent calls are no-ops.
 * Falls back gracefully to the mock 'Home' state if permission is denied.
 */
export async function startGeofence(): Promise<void> {
  if (pollHandle) return;

  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      // No permission: stay on mock 'Home' (matches the dev preview in the mockup).
      return;
    }
    await pollOnce();
  } catch {
    // ignore — keep mock
  }

  pollHandle = setInterval(() => {
    void pollOnce();
  }, 60_000);
}

export function stopGeofence(): void {
  if (pollHandle) {
    clearInterval(pollHandle);
    pollHandle = null;
  }
}

async function pollOnce(): Promise<void> {
  try {
    const pos = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
    const { latitude, longitude, accuracy } = pos.coords;

    let place: PlaceFix['place'] = 'Unknown';
    if (HOME_COORD) {
      const dist = haversineMeters(latitude, longitude, HOME_COORD.lat, HOME_COORD.lon);
      place = dist <= HOME_RADIUS_M ? 'Home' : 'On the Move';
    } else {
      // First fix: auto-pin home (good enough for v0; settings can re-pin later)
      HOME_COORD = { lat: latitude, lon: longitude };
      place = 'Home';
    }

    const next: PlaceFix = {
      place,
      latitude,
      longitude,
      accuracy,
      fixedAt: new Date().toISOString(),
    };
    if (next.place !== lastFix.place) {
      emit(next);
    } else {
      lastFix = next;
    }
  } catch {
    // ignore poll errors — retain last fix
  }
}

function haversineMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6_371_000;
  const toRad = (x: number) => (x * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}
