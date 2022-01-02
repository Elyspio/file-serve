import { useAppDispatch, useAppSelector } from "../../../../store";
import React from "react";
import { Button, ButtonProps, Grid, styled } from "@mui/material";
import { Apps, List } from "@mui/icons-material";
import { FileOwner, VisualisationMode } from "../../../../store/module/files/files.reducer";
import { setVisualisationMode } from "../../../../store/module/files/files.action";

const CustomButton = styled(Button)<ButtonProps>(({ theme }) => ({
	"&.Mui-disabled": {
		color: `${theme.palette.primary.main} !important`,
	},
}));

export function VisualisationOptions(props: { owner: FileOwner }) {
	const dispatch = useAppDispatch();
	const { visualisation } = useAppSelector((s) => s.files);
	const mode = React.useMemo(() => visualisation[props.owner], [visualisation, props.owner]);

	const getCallback = React.useCallback(
		(mode: VisualisationMode) => () => {
			dispatch(setVisualisationMode({ mode, owner: props.owner }));
		},
		[props.owner, dispatch]
	);

	return (
		<Grid container justifyContent={"flex-end"} width={"100%"} className={"VisualisationOptions"}>
			<Grid item>
				<CustomButton color={mode === "icons" ? "primary" : "inherit"} onClick={getCallback("icons")} disabled={mode === "icons"}>
					<Apps />
				</CustomButton>
			</Grid>
			<Grid item>
				<CustomButton color={mode === "list" ? "primary" : "inherit"} onClick={getCallback("list")} disabled={mode === "list"}>
					<List />
				</CustomButton>
			</Grid>
		</Grid>
	);
}
