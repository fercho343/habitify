import React from "react";
import { Body } from "./styled";

export const Layout = ({ children }: React.PropsWithChildren) => {
	return <Body>{children}</Body>;
};
