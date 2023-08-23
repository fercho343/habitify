import { t } from "i18next";
import React from "react";
import { Item } from "./Item";
import { Body } from "./styled";

export const Information = () => {
	return (
		<Body>
			<Item
				title={t("information.title.important")}
				description={t("information.description.important")}
			/>

			<Item
				title={t("information.title.privacity")}
				description={t("information.description.privacity")}
			/>

			<Item
				title={t("information.title.remember")}
				description={t("information.description.remember")}
			/>
		</Body>
	);
};
