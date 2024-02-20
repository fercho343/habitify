import {
	Actionsheet,
	ActionsheetBackdrop,
	ActionsheetContent,
	ActionsheetDragIndicator,
	ActionsheetDragIndicatorWrapper,
	ScrollView,
	Text,
} from "@gluestack-ui/themed";
import { t } from "i18next";
import { FC, useState } from "react";
import { Control, Controller } from "react-hook-form";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { emojis } from "./data";
import { Body, Box } from "./styled";

export const IconButton: FC<Props> = ({ control }) => {
	const [showActionsheet, setShowActionsheet] = useState(false);
	const handleClose = () => setShowActionsheet(!showActionsheet);
	const { bottom } = useSafeAreaInsets();

	return (
		<Controller
			control={control}
			name="icon"
			rules={{ required: true }}
			render={({ field: { onChange, value }, fieldState: { error } }) => {
				return (
					<>
						<Body>
							<Text size="xs">{t("icon")}</Text>

							<Box isInvalid={error ? true : false} onPress={handleClose}>
								<Text size="2xl">{value}</Text>
							</Box>
						</Body>
						<Actionsheet
							useRNModal
							isOpen={showActionsheet}
							onClose={handleClose}
							zIndex={999}
						>
							<ActionsheetBackdrop />
							<ActionsheetContent
								h="$96"
								zIndex={999}
								bg="$card"
								px={16}
								pb={bottom}
							>
								<ActionsheetDragIndicatorWrapper>
									<ActionsheetDragIndicator bg="$textDark100" />
								</ActionsheetDragIndicatorWrapper>

								<ScrollView
									showsVerticalScrollIndicator={false}
									contentContainerStyle={{
										flexDirection: "row",
										flexWrap: "wrap",
										justifyContent: "space-between",
										gap: 5,
										marginTop: 10,
									}}
								>
									{emojis.map((emoji, index) => (
										<Box key={index} onPress={() => {
											onChange(emoji.text);
											handleClose();
										}}>
											<Text size="2xl">{emoji.text}</Text>
										</Box>
									))}
								</ScrollView>
							</ActionsheetContent>
						</Actionsheet>
					</>
				);
			}}
		/>
	);
};

interface Props {
	control: Control<any>;
}
