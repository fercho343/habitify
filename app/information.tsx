import { Information } from "@/features/profile/Information";
import { useTheme } from "styled-components/native";

export default function InformationScreen() {
	const theme = useTheme();
	return <Information />;
}
