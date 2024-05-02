import { HabitForm } from "@/src/types/habit";
import { randomUUID } from "expo-crypto";
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
	        frequency TEXT NOT NULL,
	        hasReminder INTEGER NOT NULL,
	        startTime TEXT NOT NULL
	    );
	`);
};

export const createHabit = async (
	db: SQLiteDatabase,
	habit: HabitForm,
): Promise<void> => {
	// console.log();

	const statement = await db.prepareAsync(
		`
            INSERT INTO habits (id, name, description, icon, color, requiresGoal, goalAmount, measureUnit, frequency, hasReminder, startTime)
            VALUES ($id, $name, $description, $icon, $color, $requiresGoal, $goalAmount, $measureUnit, $frequency, $hasReminder, $startTime)
        `,
	);
	const id = randomUUID();

	try {
		const result = await statement.executeAsync<HabitForm>({
			//@ts-ignore
			$id: id,
			$name: habit.name,
			$description: habit.description,
			$icon: habit.icon,
			$color: habit.color,
			$requiresGoal: habit.requiresGoal ? 1 : 0,
			$goalAmount: habit.goalAmount,
			$measureUnit: habit.measureUnit,
			$frequency: JSON.stringify(habit.frequency),
			$hasReminder: habit.hasReminder ? 1 : 0,
			$startTime: habit.startTime,
		});
		console.log(result);
	} catch (error) {
		console.log(error);
	} finally {
		statement.finalizeAsync();
	}
};
