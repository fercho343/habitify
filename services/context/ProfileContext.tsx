import { ProfileType, ProviderProps } from "@/types/profile";
import { createContext, useContext, useState } from "react";

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

	const saveProfile = async (profileInput: ProfileType) => {};

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
