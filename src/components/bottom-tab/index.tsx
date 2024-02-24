import { router, useRootNavigationState } from "expo-router";
import { t } from "i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Item } from "./item";
import { Bar, Content } from "./styled";

//@ts-ignore
export const BottomTab = () => {
	const state = useRootNavigationState()?.index;
	const { bottom } = useSafeAreaInsets()
	
	return (
		<Bar sx={{ bottom }}>
			<Content>
				<Item
					label={t("habits")}
					icon="home"
					isActive={state === 0}
					onPress={state !== 0 ? () => router.replace("/") : () => {}}
				/>

				<Item
					label={t("progress")}
					icon="bar-chart"
					isActive={state === 1}
					onPress={state !== 1 ? () => router.replace("/(progress)") : () => {}}
				/>

				<Item
					label={t("profile")}
					icon="person"
					isActive={state === 2}
					onPress={state !== 2 ? () => router.replace("/(profile)") : () => {}}
				/>
			</Content>
		</Bar>
	);
};
