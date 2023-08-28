import { HabitCompletion } from "@/types/habit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SQLite from "expo-sqlite";

export async function createCompletedHabitsTable(
	db: SQLite.SQLiteDatabase,
): Promise<void> {
	return new Promise<void>((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				`
          CREATE TABLE IF NOT EXISTS completedHabits (
              id TEXT PRIMARY KEY,
              habitId TEXT NOT NULL,
              completionDate TEXT NOT NULL,
              progressPercent REAL
          );
        `,
				[],
				() => {
					resolve();
				},
				(_, error) => {
					console.error("Error creating completedHabits table:", error);
					reject(error);
					return false;
				},
			);
		});
	});
}

export async function getAllCompletedHabitsDB(
	db: SQLite.SQLiteDatabase,
): Promise<HabitCompletion[]> {
	return new Promise<HabitCompletion[]>((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				"SELECT * FROM completedHabits;",
				[],
				(_, result) => {
					const completedHabits: HabitCompletion[] = [];
					const rows = result.rows;
					for (let i = 0; i < rows.length; i++) {
						const row = rows.item(i);
						completedHabits.push({
							id: row.id,
							habitId: row.habitId,
							completionDate: new Date(row.completionDate),
							progressPercent: row.progressPercent,
						});
					}
					resolve(completedHabits);
				},
				(_, error) => {
					console.error("Error getting completedHabits:", error);
					reject(error);
					return false;
				},
			);
		});
	});
}

export async function getCompletedHabitByHabitIdDB(
	db: SQLite.SQLiteDatabase,
	habitId: string,
): Promise<HabitCompletion | null> {
	return new Promise<HabitCompletion | null>((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				"SELECT * FROM completedHabits WHERE habitId = ?;",
				[habitId],
				(_, result) => {
					if (result.rows.length > 0) {
						const row = result.rows.item(0);
						const completedHabit: HabitCompletion = {
							id: row.id,
							habitId: row.habitId,
							completionDate: new Date(row.completionDate),
							progressPercent: row.progressPercent,
						};
						resolve(completedHabit);
					} else {
						resolve(null);
					}
				},
				(_, error) => {
					console.error("Error getting completedHabit:", error);
					reject(error);
					return false;
				},
			);
		});
	});
}

export async function saveCompletedHabitDB(
	db: SQLite.SQLiteDatabase,
	completedHabit: HabitCompletion,
): Promise<void> {
	return new Promise<void>((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				`
                INSERT INTO completedHabits 
                (id, habitId, completionDate, progressPercent)
                VALUES (?, ?, ?, ?);
                `,
				[
					completedHabit.id,
					completedHabit.habitId,
					completedHabit.completionDate.toISOString(),
					completedHabit.progressPercent || null,
				],
				() => {
					resolve();
				},
				(_, error) => {
					console.error("Error saving completedHabit:", error);
					reject(error);
					return false;
				},
			);
		});
	});
}

export async function updateCompletedHabitDB(
	db: SQLite.SQLiteDatabase,
	completedHabit: HabitCompletion,
): Promise<void> {
	return new Promise<void>((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				`
                UPDATE completedHabits 
                SET completionDate = ?, progressPercent = ?
                WHERE id = ?;
                `,
				[
					completedHabit.completionDate.toISOString(),
					completedHabit.progressPercent ? completedHabit.progressPercent : 1,
					completedHabit.id,
				],
				() => {
					resolve();
				},
				(_, error) => {
					console.error("Error updating completedHabit:", error);
					reject(error);
					return false;
				},
			);
		});
	});
}

export async function deleteCompletedHabitsByHabitIdDB(
	db: SQLite.SQLiteDatabase,
	habitId: string,
): Promise<void> {
	return new Promise<void>((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				"DELETE FROM completedHabits WHERE habitId = ?;",
				[habitId],
				() => {
					resolve();
				},
				(_, error) => {
					console.error("Error deleting completedHabits:", error);
					reject(error);
					return false;
				},
			);
		});
	});
}

// Función para migrar datos de AsyncStorage a SQLite para completedHabits
export const migrateCompletedDataFromAsyncStorageToSQLite = async (
	db: SQLite.SQLiteDatabase,
) => {
	try {
		// Obtener datos de AsyncStorage
		const storedCompletedHabits = await AsyncStorage.getItem(
			"@completedHabits",
		);
		if (storedCompletedHabits) {
			const storedCompletedHabitsArray = JSON.parse(storedCompletedHabits);

			// Insertar datos en SQLite
			await Promise.all(
				storedCompletedHabitsArray.map(
					async (completedHabit: HabitCompletion) => {
						await saveCompletedHabitDB(db, completedHabit);
					},
				),
			);

			// Borrar datos de AsyncStorage
			await AsyncStorage.removeItem("@completedHabits");

			console.log("Migration of completedHabits successful");
		} else {
			console.log("No completedHabits to migrate");
		}
	} catch (error) {
		console.error("Error during migration of completedHabits:", error);
	}
};
