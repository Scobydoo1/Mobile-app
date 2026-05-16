import { habitsRepo } from './repositories/habitsRepo';

/**
 * Seed first-run demo data so the dashboard has a habit to nudge against.
 * Idempotent: only seeds when the habits table is empty.
 */
export async function seedDemoData(): Promise<void> {
  const existing = await habitsRepo.list();
  if (existing.length > 0) return;

  await habitsRepo.create({
    title: 'Read 5 pages of your book.',
    category: 'wind_down',
    icon: 'book',
    duration_minutes: 2,
    target_context_type: 'compound',
    target_context_value: 'Home@wind_down',
  });

  await habitsRepo.create({
    title: 'Drink a glass of water.',
    category: 'health',
    icon: 'water',
    duration_minutes: 1,
    target_context_type: 'time',
    target_context_value: 'morning',
  });

  await habitsRepo.create({
    title: '2-minute breathing reset.',
    category: 'mindfulness',
    icon: 'wind',
    duration_minutes: 2,
    target_context_type: 'location',
    target_context_value: 'Home',
  });
}
