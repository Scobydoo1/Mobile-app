import * as SQLite from 'expo-sqlite';

const DB_NAME = 'microhabit.db';
const SCHEMA_VERSION = 1;

let _db: SQLite.SQLiteDatabase | null = null;

export function getDb(): SQLite.SQLiteDatabase {
  if (!_db) throw new Error('Database not initialised. Call initDatabase() first.');
  return _db;
}

/**
 * Open the DB and apply migrations idempotently using PRAGMA user_version.
 * Safe to call multiple times — subsequent calls are no-ops.
 */
export async function initDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (_db) return _db;
  _db = await SQLite.openDatabaseAsync(DB_NAME);

  await _db.execAsync('PRAGMA foreign_keys = ON;');
  await _db.execAsync('PRAGMA journal_mode = WAL;');

  const row = await _db.getFirstAsync<{ user_version: number }>('PRAGMA user_version;');
  const version = row?.user_version ?? 0;

  if (version < 1) {
    await migrateToV1(_db);
    await _db.execAsync(`PRAGMA user_version = ${SCHEMA_VERSION};`);
  }

  return _db;
}

async function migrateToV1(db: SQLite.SQLiteDatabase): Promise<void> {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS habits (
      id TEXT PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      icon TEXT NOT NULL DEFAULT 'sparkle',
      duration_minutes INTEGER NOT NULL DEFAULT 2,
      target_context_type TEXT NOT NULL,
      target_context_value TEXT NOT NULL,
      current_streak INTEGER NOT NULL DEFAULT 0,
      max_streak INTEGER NOT NULL DEFAULT 0,
      is_active INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS habit_logs (
      id TEXT PRIMARY KEY NOT NULL,
      habit_id TEXT NOT NULL,
      timestamp TEXT NOT NULL,
      status TEXT NOT NULL,
      context_snapshot TEXT NOT NULL,
      FOREIGN KEY (habit_id) REFERENCES habits(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_logs_habit_time ON habit_logs (habit_id, timestamp DESC);
    CREATE INDEX IF NOT EXISTS idx_habits_active ON habits (is_active, target_context_type);
  `);
}

/** Dev-only: wipe the DB and re-migrate. */
export async function resetDatabase(): Promise<void> {
  if (!_db) await initDatabase();
  const db = getDb();
  await db.execAsync(`
    DROP TABLE IF EXISTS habit_logs;
    DROP TABLE IF EXISTS habits;
    PRAGMA user_version = 0;
  `);
  _db = null;
  await initDatabase();
}
