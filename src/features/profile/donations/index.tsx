import { CashAppIcon } from "@/assets/icons/cashapp";
import { PayPalIcon } from "@/assets/icons/paypal";
import {
    Icon,
    LinearGradient, ScrollView,
    Text,
    View
} from "@gluestack-ui/themed";
import { LinearGradient as ExpoLinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { t } from "i18next";
import React from "react";
import { Button } from "./button";

export const Donations = () => {
	return (
		<View flex={1}>
			<ScrollView>
				<Text mb="$4">{t("donationMessage")}</Text>

				<Button
					onPress={() =>
						router.navigate({
							pathname: "https://www.paypal.com/qrcodes/p2pqrc/WWVPMPL55EK28",
						})
					}
				>
					<LinearGradient
						//@ts-ignore
						colors={["#011435", "#006ad8"]}
						//@ts-ignore
						start={[0, 0]}
						//@ts-ignore
						end={[1, 1]}
						py="$3"
						px="$1"
						borderRadius="$md"
						as={ExpoLinearGradient}
						flexDirection="row"
						alignItems="center"
					>
						<Icon as={PayPalIcon} size="xl" color="#ffffff" mr="$2" />
						<Text style={{ color: "white" }}>{t("donatePaypal")}</Text>
					</LinearGradient>
				</Button>

				<Button
					onPress={() =>
						router.navigate({
							pathname: "https://cash.app/$fercho343?qr=1",
						})
					}
				>
					<View
						bg="#00d632"
						py="$3"
						px="$1"
						mt="$3"
						borderRadius="$md"
						flexDirection="row"
						alignItems="center"
					>
						<Icon as={CashAppIcon} size="xl" color="#ffffff" mr="$2" />
						<Text style={{ color: "white" }}>{t("donateCashapp")}</Text>
					</View>
				</Button>
			</ScrollView>
		</View>
	);
};
