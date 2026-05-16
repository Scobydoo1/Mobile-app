# MicroHabit AI — Project Memory

A local-first, context-aware micro-habit nudging app built with React Native + Expo + TypeScript.
The app observes ambient context (location + time-of-day) and surfaces *one* high-priority habit nudge at the right moment, with a "Why now" rationale.

---

## 1. Environment & Commands

| Purpose | Command |
| --- | --- |
| Install deps | `npm install` |
| Start dev server | `npx expo start` |
| Start with cleared cache | `npx expo start -c` |
| Run on iOS Simulator | `npx expo start --ios` |
| Run on Android emulator | `npx expo start --android` |
| Type-check | `npx tsc --noEmit` |
| Lint | `npx expo lint` |
| Reset DB (dev only) | call `resetDatabase()` from `src/database/db.ts` (exposed in dev console) |
| Seed demo data | call `seedDemoData()` from `src/database/seed.ts` |

> SQLite migrations are run automatically on app boot via `initDatabase()` (idempotent, version-gated by `PRAGMA user_version`).

### Required Expo SDK Packages
- `expo` (~51 or newer)
- `expo-sqlite` — local persistence
- `expo-location` — geofencing/region monitoring
- `expo-notifications` — local push for snooze
- `expo-task-manager` — background location task
- `expo-router` — file-based navigation + tabs
- `expo-haptics` — button feedback
- `react-native-reanimated` — card spring/fade transitions
- `nativewind` + `tailwindcss` — utility styling
- `react-native-svg` — icon primitives
- `expo-blur` / `expo-linear-gradient` — glassmorphic card surfaces

### Permissions (app.json)
- iOS: `NSLocationWhenInUseUsageDescription`, `NSLocationAlwaysAndWhenInUseUsageDescription`, `UIBackgroundModes: ["location"]`
- Android: `ACCESS_FINE_LOCATION`, `ACCESS_BACKGROUND_LOCATION`, `RECEIVE_BOOT_COMPLETED`, `POST_NOTIFICATIONS`

---

## 2. Database Schema (SQLite)

`PRAGMA user_version = 1`

### `habits`
| Column | Type | Notes |
| --- | --- | --- |
| `id` | TEXT PRIMARY KEY | UUID v4 |
| `title` | TEXT NOT NULL | e.g. "Read 5 pages of your book." |
| `category` | TEXT NOT NULL | e.g. `wind_down`, `morning`, `health` |
| `icon` | TEXT | semantic icon key |
| `duration_minutes` | INTEGER NOT NULL DEFAULT 2 | estimated time-cost |
| `target_context_type` | TEXT NOT NULL | `location` \| `time` \| `compound` |
| `target_context_value` | TEXT NOT NULL | e.g. `Home`, `18:00-19:00`, `Home@18:00-19:00` |
| `current_streak` | INTEGER NOT NULL DEFAULT 0 | |
| `max_streak` | INTEGER NOT NULL DEFAULT 0 | |
| `is_active` | INTEGER NOT NULL DEFAULT 1 | bool 0/1 |
| `created_at` | TEXT NOT NULL | ISO-8601 |
| `updated_at` | TEXT NOT NULL | ISO-8601 |

### `habit_logs`
| Column | Type | Notes |
| --- | --- | --- |
| `id` | TEXT PRIMARY KEY | UUID v4 |
| `habit_id` | TEXT NOT NULL | FK → habits.id (ON DELETE CASCADE) |
| `timestamp` | TEXT NOT NULL | ISO-8601 |
| `status` | TEXT NOT NULL | `completed` \| `snoozed` \| `skipped` |
| `context_snapshot` | TEXT NOT NULL | JSON `{ location, latitude, longitude, hour, dayOfWeek }` |

Indexes:
- `idx_logs_habit_time` on `(habit_id, timestamp DESC)`
- `idx_habits_active` on `(is_active, target_context_type)`

### Repository API (src/database/repositories/)
```ts
habitsRepo.list(): Promise<Habit[]>
habitsRepo.getById(id): Promise<Habit | null>
habitsRepo.create(input): Promise<Habit>
habitsRepo.update(id, patch): Promise<void>
habitsRepo.getByContext(type, value): Promise<Habit[]>
habitsRepo.bumpStreak(id, delta): Promise<void>

logsRepo.logHabitAction(habitId, status, context): Promise<HabitLog>
logsRepo.getRecentForHabit(habitId, sinceISO): Promise<HabitLog[]>
logsRepo.lastCompletedAt(habitId): Promise<string | null>

streaks.calculateStreak(habitId): Promise<{ current: number, max: number }>
```

---

## 3. State Architecture

```
App Boot
  └── DatabaseProvider     (initialises SQLite, runs migrations, seeds)
       └── ContextProvider (geofence + temporal ticks → currentContext)
            └── NudgeProvider (score habits, expose activeNudge)
                 └── NotificationProvider (snooze scheduling, deep-link receiver)
                      └── <App />
```

- **`useAppContext()`** → `{ currentContext: { location, timeString, rawTime, timeWindow } }`
- **`useNudge()`** → `{ activeNudge, refresh, markDone, snooze }`
- **`useDatabase()`** → `{ db, ready }`

State is React Context + reducer (no Redux). Persistence = SQLite + `expo-secure-store` for last-known context.

---

## 4. Feature Roadmap (granular micro-tasks)

### Phase 0 — Foundation
- [x] CLAUDE.md persistent project memory
- [ ] Expo + TS scaffolding (package.json, app.json, babel, tsconfig, tailwind)
- [ ] Folder structure (`src/{database,context,services,components,screens,theme,utils}`)
- [ ] Theme tokens (`src/theme/tokens.ts`) — colors, radii, spacing, typography
- [ ] Global `App` shell with safe-area + status bar

### Phase 1 — Data Layer
- [ ] `src/database/db.ts` — open/init/migrate
- [ ] Migration v1 — habits + habit_logs + indexes
- [ ] `src/database/repositories/habitsRepo.ts`
- [ ] `src/database/repositories/logsRepo.ts`
- [ ] `src/database/streaks.ts` — streak calc
- [ ] `src/database/seed.ts` — demo "Read 5 pages" habit

### Phase 2 — Context Engine
- [ ] `src/services/location/geofence.ts` — region monitor + Home definition
- [ ] `src/services/time/temporal.ts` — tick interval + time-window resolver
- [ ] `src/context/AppContextProvider.tsx` — `useAppContext()`
- [ ] `src/utils/timeWindows.ts` — Morning/Midday/Wind-down classifier

### Phase 3 — Nudge AI
- [ ] `src/services/nudge/scoring.ts` — weighted score function
- [ ] `src/services/nudge/rationale.ts` — "Why now" template parser
- [ ] `src/context/NudgeProvider.tsx` — exposes `activeNudge`

### Phase 4 — Notifications & Lifecycle
- [ ] `src/services/notifications/setup.ts` — permission + channel
- [ ] `src/services/notifications/scheduler.ts` — `scheduleSnooze(habitId, 30m)`
- [ ] `src/services/notifications/deepLink.ts` — handle tap → open habit
- [ ] Foreground in-app alert handler

### Phase 5 — UI (pixel-perfect to mockup)
- [ ] `app/_layout.tsx` — Expo Router root
- [ ] `app/(tabs)/_layout.tsx` — Habits / Progress / Insights / Settings tabs with purple ring
- [ ] `app/(tabs)/index.tsx` — Habits home screen
- [ ] `<DateHeader />` — "SATURDAY · MAY 16" + Welcome + subline
- [ ] `<LiveContextCard />` — glassmorphic, "YOU ARE HOME" + pill chips
- [ ] `<NudgeCard />` — title, chips, Why-now sub-card, Done/Snooze buttons
- [ ] Spring/fade transitions (reanimated) on Done & Snooze
- [ ] Confetti on completion
- [ ] Tab-bar active scale-ring

### Phase 6 — Polish
- [ ] Empty/loading/error states
- [ ] Haptic feedback on Done/Snooze
- [ ] Deep link from snooze notification
- [ ] On-the-Move morph state for LiveContextCard

---

## 5. Completion Checklist

| Module | Status |
| --- | --- |
| Persistent memory (CLAUDE.md) | ✅ |
| Project scaffolding | ⬜ |
| SQLite schema + migrations | ⬜ |
| Habits + logs repositories | ⬜ |
| Streak calculator | ⬜ |
| Geofence module | ⬜ |
| Temporal tick module | ⬜ |
| AppContextProvider + `useAppContext()` | ⬜ |
| Nudge scoring (weighted) | ⬜ |
| "Why now" rationale generator | ⬜ |
| NudgeProvider + `useNudge()` | ⬜ |
| Notification setup + permissions | ⬜ |
| Snooze scheduler (+30m) | ⬜ |
| Deep-link receiver | ⬜ |
| Theme tokens | ⬜ |
| `<DateHeader />` | ⬜ |
| `<LiveContextCard />` (glassmorphic) | ⬜ |
| `<NudgeCard />` | ⬜ |
| Done button animation + confetti | ⬜ |
| Snooze button animation + collapse | ⬜ |
| Tab bar with active purple ring | ⬜ |
| Foreground in-app alert card | ⬜ |
| On-the-Move state morph | ⬜ |

---

## 6. Screenshot-Validation Protocol

**HARD RULE.** After finishing each of the following milestones, generation MUST halt and the user must upload a simulator screenshot for visual verification before the next layer is built:

1. SQLite tables + seed data wired (verify via console / debug screen)
2. `<DateHeader />` + `<LiveContextCard />` rendered (first visual block)
3. `<NudgeCard />` rendered with chips + Why-now sub-card
4. Done/Snooze interactions wired + animated
5. Tab bar implemented with active purple ring

Compare spacing, font weights, button padding, border-radii, and color accuracy against the mockup before continuing.
