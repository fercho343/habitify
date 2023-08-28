import { Text } from "@/components/Text";
import { Entypo } from "@expo/vector-icons";
import NetInfo from "@react-native-community/netinfo";
import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { useTheme } from "styled-components/native";
import { IconContent, Row } from "./styled";

export const AsyncData = () => {
	const theme = useTheme();
	const [devices, setDevices] = useState([]);

	useEffect(() => {
		const fetchDevices = async () => {
			try {
				const netInfo = await NetInfo.fetch();
				const { details } = netInfo;

				if (details) {
					//@ts-ignore
					setDevices([details]);
				}
			} catch (error) {
				console.error("Error fetching devices:", error);
			}
		};

		fetchDevices();
	}, []);

	console.log(devices);

	return (
		<Row>
			<IconContent>
				<Entypo name="database" size={25} color={theme.colors.box} />
			</IconContent>
			<Text variant="subtitle_small">{t("async-data")}</Text>
		</Row>
	);
};
