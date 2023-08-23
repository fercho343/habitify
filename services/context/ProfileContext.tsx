import { ProfileType, ProviderProps } from "@/types/profile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

interface ProfileContextType {
	profile: ProfileType;
	saveProfile: (profileInput: ProfileType) => void;
}

export const ProfileContext = createContext<ProfileContextType>({
	profile: { name: "", picture: "" },
	saveProfile: (profileInput: ProfileType) => {},
});

export const ProfileProvider: React.FC<ProviderProps> = ({ children }) => {
	const [profile, setProfile] = useState<ProfileType>({
		name: "",
		picture: "",
	});

	useEffect(() => {
		(async () => {
			const getProfile = await AsyncStorage.getItem("@profile");
			if (getProfile !== null) {
				setProfile(JSON.parse(getProfile));
			} else {
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
			await AsyncStorage.setItem("@profile", JSON.stringify(updatedProfile));
			setProfile(updatedProfile);
		} catch (error) {
			console.error("Error saving profile in AsyncStorage:", error);
		}
	};

	return (
		<ProfileContext.Provider
			value={{
				profile,
				saveProfile,
			}}
		>
			{children}
		</ProfileContext.Provider>
	);
};

export function useProfile() {
	return useContext(ProfileContext);
}
