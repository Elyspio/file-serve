import {Typography} from "@material-ui/core";
import React, {ReactChild} from "react";

export function Title(props: { children: ReactChild }) {
	return <Typography
		color={"textPrimary"}
		style={{fontSize: "120%"}}
		variant={"overline"}
	>
		{props.children}
	</Typography>
}
