// @flow
import * as React from "react";
import { FileOwner } from "../../../../store/module/files/files.reducer";
import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router";
import { routes } from "../../../../config/routes";

type Props = {
	owner: FileOwner;
};

export function EmptyFileList(props: Props) {
	const navigate = useNavigate();

	const move = React.useCallback(() => navigate(routes.addFile, { state: { user: props.owner === "user" } }), [navigate, props.owner]);

	return (
		<Grid container alignItems={"center"} justifyContent={"center"} sx={{ height: "100%" }}>
			<Grid item>
				<Button variant={"outlined"} onClick={move}>
					Add file
				</Button>
			</Grid>
		</Grid>
	);
}
