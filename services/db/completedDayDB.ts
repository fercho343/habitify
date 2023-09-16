import { CompletedDay } from "@/types/habit";
import * as SQLite from "expo-sqlite";

//Completed days
export async function createCompletedDaysTable(
	db: SQLite.SQLiteDatabase,
): Promise<void> {
	return new Promise<void>((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				`
          CREATE TABLE IF NOT EXISTS completedDays (
            id TEXT PRIMARY KEY,
            date TEXT NOT NULL,
            allHabitsCompleted INTEGER NOT NULL
          );
        `,
				[],
				() => {
					resolve();
				},
				(_, error) => {
					console.error("Error creating completedDays table:", error);
					reject(error);
					return false; // Indicar que no se revierta la transacción
				},
			);
		});
	});
}

export async function saveCompletedDayDB(
	db: SQLite.SQLiteDatabase,
	completedDay: CompletedDay,
): Promise<void> {
	return new Promise<void>((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				`
          INSERT INTO completedDays (id, date, allHabitsCompleted)
          VALUES (?, ?, ?);
          `,
				[
					completedDay.id,
					completedDay.date.toISOString(),
					completedDay.allHabitsCompleted ? 1 : 0,
				],
				() => {
					console.log("Registro de CompletedDay guardado con éxito.");
					resolve();
				},
				(_, error) => {
					console.error("Error saving completed day:", error);
					reject(error);
					return false;
				},
			);
		});
	});
}

export async function getAllCompletedDaysDB(
	db: SQLite.SQLiteDatabase,
): Promise<CompletedDay[]> {
	return new Promise<CompletedDay[]>((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				"SELECT * FROM completedDays;",
				[],
				(_, result) => {
					const completedDays: CompletedDay[] = [];
					const rows = result.rows;
					for (let i = 0; i < rows.length; i++) {
						const row = rows.item(i);
						const completedDay: CompletedDay = {
							id: row.id,
							date: new Date(row.date),
							allHabitsCompleted: row.allHabitsCompleted === 1,
						};
						completedDays.push(completedDay);
					}
					resolve(completedDays);
				},
				(_, error) => {
					console.error("Error getting all completed days:", error);
					reject(error);
					return false;
				},
			);
		});
	});
}

export async function getCompletedDayByDateDB(
	db: SQLite.SQLiteDatabase,
	date: Date,
): Promise<CompletedDay | null> {
	return new Promise<CompletedDay | null>((resolve, reject) => {
		db.transaction((tx) => {
			const dateString = date.toISOString().split("T")[0];

			tx.executeSql(
				"SELECT * FROM completedDays WHERE date LIKE ?;",
				[`${dateString}%`],
				(_, result) => {
					if (result.rows.length > 0) {
						const row = result.rows.item(0);
						const completedDay: CompletedDay = {
							id: row.id,
							date: new Date(row.date),
							allHabitsCompleted: row.allHabitsCompleted === 1,
						};
						resolve(completedDay);
					} else {
						resolve(null);
					}
				},
				(_, error) => {
					console.error("Error getting completed day by date:", error);
					reject(error);
					return false;
				},
			);
		});
	});
}

export async function deleteAllCompletedDays(
	db: SQLite.SQLiteDatabase,
): Promise<void> {
	return new Promise<void>((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				"DELETE FROM completedDays;",
				[],
				() => {
					console.log(
						"Todos los registros de CompletedDay han sido eliminados.",
					);
					resolve();
				},
				(_, error) => {
					console.error(
						"Error al eliminar todos los registros de CompletedDay:",
						error,
					);
					reject(error);
					return false;
				},
			);
		});
	});
}
