import { ProfileType, ProviderProps } from "@/types/profile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SQLite from "expo-sqlite";
import { createContext, useContext, useEffect, useState } from "react";
import {
	createJournalTableIfNotExists,
	getAllJournalEntriesDB,
	saveJournalDB,
} from "../db/JournalDB";

interface ProfileContextType {
	profile: ProfileType;
	saveProfile: (profileInput: ProfileType) => void;
	saveJournalEntry: (entry: JournalType) => void;
}

export const ProfileContext = createContext<ProfileContextType>({
	profile: { name: "", picture: "" },
	saveProfile: (profileInput: ProfileType) => {},
	saveJournalEntry: () => {},
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

				if (getJournalEntries.length > 0) {
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

	const saveJournalEntry = async (entry: JournalType) => {
		try {
			saveJournalDB(db, entry);
		} catch (error) {}
	};

	return (
		<ProfileContext.Provider
			value={{
				profile,
				saveProfile,
				saveJournalEntry,
			}}
		>
			{children}
		</ProfileContext.Provider>
	);
};

export function useProfile() {
	return useContext(ProfileContext);
}
