import { SQLiteDatabase } from "expo-sqlite";

export async function createJournalTableIfNotExists(
	db: SQLiteDatabase,
): Promise<void> {
	return new Promise<void>((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				`
          CREATE TABLE IF NOT EXISTS journal (
            id TEXT PRIMARY KEY,
            text TEXT,
            date TEXT
          );
        `,
				[],
				() => {
					resolve();
				},
				(_, error) => {
					console.error("Error creating journal table:", error);
					reject(error);
					return false;
				},
			);
		});
	});
}

export async function getAllJournalEntriesDB(
	db: SQLiteDatabase,
): Promise<JournalType[]> {
	return new Promise<JournalType[]>((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				`
          SELECT * FROM journal;
        `,
				[],
				(_, { rows }) => {
					const entries: JournalType[] = [];
					for (let i = 0; i < rows.length; i++) {
						const row = rows.item(i);
						const entry: JournalType = {
							id: row.id,
							text: row.text,
							date: new Date(row.date), // Convertir la cadena de fecha en un objeto Date
						};
						entries.push(entry);
					}
					resolve(entries);
				},
				(_, error) => {
					console.error("Error fetching journal entries:", error);
					reject(error);
					return false;
				},
			);
		});
	});
}

// Función para obtener entradas de diario por fecha
export async function getJournalEntriesByDate(
	db: SQLiteDatabase,
	date: Date,
): Promise<JournalType[]> {
	return new Promise<JournalType[]>((resolve, reject) => {
		const dateString = date.toISOString().split("T")[0]; // Formatea la fecha como cadena YYYY-MM-DD

		db.transaction((tx) => {
			tx.executeSql(
				`
          SELECT * FROM journal WHERE date = ?;
        `,
				[dateString],
				(_, { rows }) => {
					const entries: JournalType[] = [];
					for (let i = 0; i < rows.length; i++) {
						const row = rows.item(i);
						const entry: JournalType = {
							id: row.id,
							text: row.text,
							date: new Date(row.date), // Convertir la cadena de fecha en un objeto Date
						};
						entries.push(entry);
					}
					resolve(entries);
				},
				(_, error) => {
					console.error("Error fetching journal entries by date:", error);
					reject(error);
					return false;
				},
			);
		});
	});
}

export async function saveJournalDB(
	db: SQLiteDatabase,
	journalEntry: JournalType,
): Promise<void> {
	return new Promise<void>((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				`
          INSERT INTO journal 
          (id, text, date)
          VALUES (?, ?, ?);
        `,
				[journalEntry.id, journalEntry.text, journalEntry.date.toISOString()],
				() => {
					resolve();
				},
				(_, error) => {
					console.error("Error saving journal entry:", error);
					reject(error);
					return false;
				},
			);
		});
	});
}
