import { Text } from "@/components/Text";
import { Link } from "expo-router";
import { t } from "i18next";
import React from "react";
import { Body } from "../Information/styled";
import { Row } from "./styled";

export const Donation = () => {
	return (
		<Body>
			<Text>{t("donation-message")}</Text>
			<Link href="https://www.paypal.com/qrcodes/p2pqrc/WWVPMPL55EK28" asChild>
				<Row style={{ backgroundColor: "blue" }}>
					<Text style={{ color: "white" }}>{t("donate-paypal")}</Text>
				</Row>
			</Link>

			<Link href="https://cash.app/$fercho343?qr=1" asChild>
				<Row style={{ backgroundColor: "green" }}>
					<Text style={{ color: "white" }}>{t("donate-cashapp")}</Text>
				</Row>
			</Link>
		</Body>
	);
};
