//@ts-nocheck
import React from "react";
import { NlContent, NlText } from "./styled";

export const Nv: React.FC<PropsNv> = ({
	width = 35,
	height = 35,
	bottom = -10,
	right = 10,
	fontSize = 10,
}) => {
	return (
		<NlContent
			$width={width}
			$height={height}
			$bottom={bottom}
			$right={right}
			// style={{ width: 60, height: 60, bottom: -15, right: -10 }}
		>
			<NlText $fontSize={fontSize}>Nv 1</NlText>
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
