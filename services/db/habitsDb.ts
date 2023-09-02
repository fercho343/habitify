import { Habit } from "@/types/habit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SQLite from "expo-sqlite";

export async function createHabitsTable(
	db: SQLite.SQLiteDatabase,
): Promise<void> {
	return new Promise<void>((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				`
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
                `,
				[],
				() => {
					resolve();
				},
				(_, error) => {
					console.error("Error creating habits table:", error);
					return false; // Indicar que no se revierta la transacción
				},
			);
		});
	});
}

export async function getAllHabits(
	db: SQLite.SQLiteDatabase,
): Promise<Habit[]> {
	return new Promise<Habit[]>((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				"SELECT * FROM habits;",
				[],
				(_, result) => {
					const habits: Habit[] = [];
					const rows = result.rows;
					for (let i = 0; i < rows.length; i++) {
						const row = rows.item(i);
						habits.push({
							...row,
							daysOfWeek: JSON.parse(row.daysOfWeek), // Transforma la cadena JSON a array
							requiresGoal: row.requiresGoal === 1,
							hasReminder: row.hasReminder === 1,
						});
					}
					resolve(habits);
				},
				(_, error) => {
					console.error("Error getting habits:", error);
					reject(error);
					return false;
				},
			);
		});
	});
}

export async function getHabitByIdDB(
	db: SQLite.SQLiteDatabase,
	habitId: string,
): Promise<Habit | null> {
	return new Promise<Habit | null>((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				"SELECT * FROM habits WHERE id = ?;",
				[habitId],
				(_, result) => {
					if (result.rows.length > 0) {
						const row = result.rows.item(0);
						const habit: Habit = {
							id: row.id,
							name: row.name,
							description: row.description || "",
							icon: row.icon,
							color: row.color,
							requiresGoal: row.requiresGoal === 1,
							goalAmount: row.goalAmount || null,
							measureUnit: row.measureUnit || null,
							daysOfWeek: JSON.parse(row.daysOfWeek),
							hasReminder: row.hasReminder === 1,
							startTime: row.startTime,
						};
						resolve(habit);
					} else {
						resolve(null);
					}
				},
				(_, error) => {
					console.error("Error getting habit by ID:", error);
					reject(error);
					return false;
				},
			);
		});
	});
}

export async function saveHabitDB(
	db: SQLite.SQLiteDatabase,
	habit: Habit,
): Promise<void> {
	return new Promise<void>((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				`
					INSERT INTO habits 
					(id, name, description, icon, color, requiresGoal, goalAmount, measureUnit, daysOfWeek, hasReminder, startTime)
					VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
				`,
				[
					habit.id,
					habit.name,
					habit.description || "",
					habit.icon,
					habit.color,
					habit.requiresGoal ? 1 : 0,
					habit.goalAmount || null,
					habit.measureUnit || null,
					JSON.stringify(habit.daysOfWeek),
					habit.hasReminder ? 1 : 0,
					habit.startTime,
				],
				() => {
					resolve();
				},
				(_, error) => {
					console.error("Error saving habit:", error);
					reject(error);
					return false;
				},
			);
		});
	});
}

export async function updateHabitDB(
	db: SQLite.SQLiteDatabase,
	habitId: string,
	updateHabit: Omit<Habit, "id">,
): Promise<void> {
	return new Promise<void>((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				`
					UPDATE habits 
					SET name = ?, description = ?, icon = ?, color = ?, requiresGoal = ?, 
					goalAmount = ?, measureUnit = ?, daysOfWeek = ?, hasReminder = ?, startTime = ?
					WHERE id = ?;
				`,
				[
					updateHabit.name,
					updateHabit.description || "",
					updateHabit.icon,
					updateHabit.color,
					updateHabit.requiresGoal ? 1 : 0,
					updateHabit.goalAmount || null,
					updateHabit.measureUnit || null,
					JSON.stringify(updateHabit.daysOfWeek),
					updateHabit.hasReminder ? 1 : 0,
					updateHabit.startTime,
					habitId,
				],
				() => {
					resolve();
				},
				(_, error) => {
					console.error("Error updating habit:", error);
					reject(error);
					return false;
				},
			);
		});
	});
}

export async function deleteHabitByIdDB(
	db: SQLite.SQLiteDatabase,
	habitId: string,
): Promise<void> {
	return new Promise<void>((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				`
					DELETE FROM habits
					WHERE id = ?;
				`,
				[habitId],
				() => {
					resolve();
				},
				(_, error) => {
					console.error("Error deleting habit:", error);
					reject(error);
					return false;
				},
			);
		});
	});
}

// Función para migrar datos de AsyncStorage a SQLite
export const migrateDataFromAsyncStorageToSQLite = async (
	db: SQLite.SQLiteDatabase,
) => {
	try {
		// Obtener datos de AsyncStorage
		const storedHabits = await AsyncStorage.getItem("@habits");
		if (storedHabits) {
			const storedHabitsArray = JSON.parse(storedHabits);

			// Insertar datos en SQLite
			await Promise.all(
				storedHabitsArray.map(async (habit: Habit) => {
					await saveHabitDB(db, habit);
				}),
			);

			// Borrar datos de AsyncStorage
			await AsyncStorage.removeItem("@habits");
		}
	} catch (error) {
		console.error("Error during migration:", error);
	}
};
