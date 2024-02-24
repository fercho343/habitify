import { type SQLiteDatabase } from "expo-sqlite/next";

export const createHabitTable = (db: SQLiteDatabase): void => {
	db.execAsync(`
        CREATE TABLE IF NOT EXISTS habits (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            description TEXT,
            icon TEXT NOT NULL,
            color TEXT NOT NULL,
            requiresGoal INTEGER NOT NULL,
            goalAmount INTEGER,
            measureUnit TEXT,
            daysOfWeek TEXT NOT NULL,
            hasReminder INTEGER NOT NULL,
            startTime TEXT NOT NULL
        );
    `);
};
