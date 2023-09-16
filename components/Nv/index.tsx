//@ts-nocheck
import { useHabit } from "@/services/context/HabitContext";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { NlContent, NlText } from "./styled";

export const Nv: React.FC<PropsNv> = ({
	width = 35,
	height = 35,
	bottom = -10,
	right = 10,
	fontSize = 10,
}) => {
	const { completedDays } = useHabit();
	const [currentLevel, setCurrentLevel] = useState(1);

	useEffect(() => {
		const today = moment();
		let consecutiveDays = 0;

		// Recorre los hábitos completados en orden inverso para contar los días consecutivos
		for (let i = completedDays.length - 1; i >= 0; i--) {
			const completedDate = moment(completedDays[i].date);

			// Compara las fechas sin tener en cuenta la hora
			if (completedDate.isSameOrAfter(today, "day")) {
				consecutiveDays++;
			} else {
				// Si no es consecutivo, detén el ciclo
				break;
			}
		}

		let newLevel = 1;
		let daysRequiredForNextLevel = 1;

		while (consecutiveDays >= daysRequiredForNextLevel) {
			newLevel++;
			daysRequiredForNextLevel += newLevel * 2 + 1; // Requiere 1 día más que el nivel anterior
		}

		setCurrentLevel(newLevel);
	}, [currentLevel, completedDays]);

	return (
		<NlContent
			$width={width}
			$height={height}
			$bottom={bottom}
			$right={right}
			// style={{ width: 60, height: 60, bottom: -15, right: -10 }}
		>
			<NlText $fontSize={fontSize}>Nv {currentLevel}</NlText>
		</NlContent>
	);
};

export interface PropsNv {
	width?: number;
	height?: number;
	bottom?: number;
	right?: number;
	fontSize?: number;
}
