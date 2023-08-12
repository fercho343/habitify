import { ProfileType } from "@/types/profile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ReactNode, createContext, useEffect, useState } from "react";

interface ProfileContextType {
	profile: ProfileType;
	saveProfile: (profileInput: ProfileType) => void;
}

export const ProfileContext = createContext<ProfileContextType>({
	profile: { name: "", picture: "" },
	saveProfile: (profileInput: ProfileType) => {},
});

interface ProviderProps {
	children: ReactNode;
}

export const ProfileProvider = ({ children }: ProviderProps) => {
	const [profile, setProfile] = useState<ProfileType>({
		name: "",
		picture: "",
	});

	useEffect(() => {
		(async () => {
			const getProfile = await AsyncStorage.getItem("profile");
			if (getProfile !== null) {
				setProfile(JSON.parse(getProfile));
			} else {
				console.log("no existe");
			}
		})();
	}, []);

	const saveProfile = async (profileInput: ProfileType) => {
		const updatedProfile = {
			name: profileInput.name !== "" ? profileInput.name : profile.name,
			picture:
				profileInput.picture !== "" ? profileInput.picture : profile.picture,
		};

		try {
			await AsyncStorage.setItem("profile", JSON.stringify(updatedProfile));
			setProfile(updatedProfile);
		} catch (error) {
			console.error("Error saving profile in AsyncStorage:", error);
		}
	};

	return (
		<ProfileContext.Provider value={{ profile, saveProfile }}>
			{children}
		</ProfileContext.Provider>
	);
};
