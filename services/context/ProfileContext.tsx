import { ProfileType, ProviderProps } from "@/types/profile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SQLite from "expo-sqlite";
import moment from "moment";
import { createContext, useContext, useEffect, useState } from "react";
import {
	createJournalTableIfNotExists,
	editJournalEntryDB,
	getAllJournalEntriesDB,
	saveJournalDB,
} from "../db/JournalDB";

interface ProfileContextType {
	profile: ProfileType;
	saveProfile: (profileInput: ProfileType) => void;
	journalEntries: JournalType[];
	saveOrUpdateJournalEntry: (entry: JournalType) => void;
}

export const ProfileContext = createContext<ProfileContextType>({
	profile: { name: "", picture: "" },
	saveProfile: (profileInput: ProfileType) => {},
	journalEntries: [],
	saveOrUpdateJournalEntry: () => {},
});

export const ProfileProvider: React.FC<ProviderProps> = ({ children }) => {
	const [profile, setProfile] = useState<ProfileType>({
		name: "",
		picture: "",
	});

	const [journalEntries, setJournalEntries] = useState<JournalType[]>([]);

	const db = SQLite.openDatabase("habitDevelop.db");

	useEffect(() => {
		(async () => {
			try {
				createJournalTableIfNotExists(db);
				const getProfile = await AsyncStorage.getItem("@profile");
				if (getProfile !== null) {
					setProfile(JSON.parse(getProfile));
				}

				const getJournalEntries = await getAllJournalEntriesDB(db);
				console.log(getJournalEntries);

				if (getJournalEntries !== null) {
					setJournalEntries(getJournalEntries);
				}
			} catch (error) {}
		})();
	}, []);

	const saveProfile = async (profileInput: ProfileType) => {
		const updatedProfile = {
			name: profileInput.name !== "" ? profileInput.name : profile.name,
			picture:
				profileInput.picture !== "" ? profileInput.picture : profile.picture,
		};

		try {
			await AsyncStorage.setItem("@profile", JSON.stringify(updatedProfile));
			setProfile(updatedProfile);
		} catch (error) {
			console.error("Error saving profile in AsyncStorage:", error);
		}
	};

	const saveOrUpdateJournalEntry = async (entry: JournalType) => {
		try {
			const today = moment().startOf("day"); // Inicializa a las 12:00 a. m. del día de hoy

			const existingEntry = journalEntries.find((journalEntry) =>
				moment(journalEntry.date).startOf("day").isSame(today, "day"),
			);

			if (existingEntry) {
				// Si existe una entrada con la fecha de hoy, editarla
				const updatedEntry = { ...existingEntry, ...entry };
				await editJournalEntryDB(db, updatedEntry.id, updatedEntry.text);

				setJournalEntries((prevJournalEntries) =>
					prevJournalEntries.map((journalEntry) =>
						journalEntry.id === updatedEntry.id ? updatedEntry : journalEntry,
					),
				);
			} else {
				// Si no existe una entrada con la fecha de hoy, crear una nueva entrada
				const newEntry = {
					...entry,
					date: today.toDate(), // Convierte la fecha Moment a un objeto Date
				};
				await saveJournalDB(db, newEntry);

				setJournalEntries((prevJournalEntries) => [
					...prevJournalEntries,
					newEntry,
				]);
			}
		} catch (error) {
			console.error("Error saving or updating journal entry:", error);
		}
	};

	return (
		<ProfileContext.Provider
			value={{
				profile,
				saveProfile,
				journalEntries,
				saveOrUpdateJournalEntry,
			}}
		>
			{children}
		</ProfileContext.Provider>
	);
};

export function useProfile() {
	return useContext(ProfileContext);
}
