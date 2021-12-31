import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Typography } from "@mui/material";
import { useInjection } from "inversify-react";
import { DiKeysService } from "../../../../core/di/di.keys.service";
import { FilesService } from "../../../../core/services/files.service";
import { FileModel } from "../../../../core/apis/backend/generated";
import { Close, GetApp, Visibility } from "@mui/icons-material";
import { useModal } from "../../../hooks/useModal";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { themes } from "../../../../config/theme";
import { JsonViewer } from "../../viewer/JsonViewer";
import { WebContentViewer } from "../../viewer/WebContentViewer";
import { deleteFile } from "../../../../store/module/files/files.action";

const getComponentFromMime = (mime: string) => {
	/**
	 * @param content base64 encoded content
	 */
	return (content: string) => {
		if (["application/pdf", "image/png", "image/jpeg"].includes(mime)) {
			return <WebContentViewer content={content} mime={mime} />;
		} else {
			if (mime === "application/json") {
				return <JsonViewer data={JSON.parse(content)} />;
			}

			return (
				<Typography color={"textSecondary"} component={"div"}>
					<pre>{content}</pre>
				</Typography>
			);
		}
	};
};

type FileProps = {
	data: FileModel;
	user?: boolean;
};

export function FileDetail({ data: { id, filename, mime }, user }: FileProps) {
	const [previewContent, setPreviewContent] = useState("");
	const { setOpen, open, setClose } = useModal(false);

	const logged = useAppSelector((s) => s.authentication.logged);

	let type: "user" | "public" = React.useMemo(() => (user ? "user" : "public"), [user]);

	const dispatch = useAppDispatch();

	const services = {
		files: useInjection<FilesService>(DiKeysService.files),
	};

	const funcs = React.useMemo(() => services.files[type], [services.files, type]);

	const download = useCallback(() => {
		return funcs.download(id);
	}, [funcs, id]);

	const del = useCallback(() => {
		dispatch(deleteFile({ fileId: id, type }));
	}, [dispatch, type, id]);

	const view = useCallback(
		async (e) => {
			const content = await funcs.getContentAsString(id);
			setOpen(e);
			setPreviewContent(content);
		},
		[funcs, id, setOpen]
	);

	const colors = useAppSelector((s) => {
		const dark = s.theme.current === "dark";
		return {
			download: dark ? themes[s.theme.current].palette.primary.main : themes[s.theme.current].palette.primary.main,
			del: dark ? themes[s.theme.current].palette.error.main : themes[s.theme.current].palette.error.main,
			view: dark ? themes[s.theme.current].palette.secondary.main : themes[s.theme.current].palette.secondary.main,
		};
	});

	useEffect(() => {
		if (!open) setTimeout(() => setPreviewContent(""), 150);
	}, [open]);

	return (
		<Grid className={"FileDetail"} container alignItems={"center"} justifyContent={"space-between"}>
			<Grid item xs={6}>
				<Typography color={"textPrimary"}>{filename}</Typography>
			</Grid>

			<Grid container xs={6} item direction={"row"} alignItems={"center"} justifyContent={"flex-end"} wrap={"nowrap"} spacing={1}>
				<Grid item>
					<IconButton title={"Preview file"} onClick={view} size="large">
						<Visibility style={{ fill: colors.view }} />
					</IconButton>
				</Grid>

				<Grid item>
					<IconButton title={"Download file"} onClick={download} size="large">
						<GetApp style={{ fill: colors.download }} />
					</IconButton>
				</Grid>

				{logged && (
					<Grid item>
						<IconButton title={"Delete file"} onClick={del} size="large">
							<Close style={{ fill: colors.del }} />
						</IconButton>
					</Grid>
				)}
			</Grid>

			<Dialog onClose={setClose} aria-labelledby={`file-dialog-${id}`} open={open} maxWidth={false}>
				<DialogTitle id={`file-dialog-${id}-title`}>{filename}</DialogTitle>
				<DialogContent dividers style={{ width: "60vw", height: "60vh" }}>
					{previewContent && getComponentFromMime(mime)(previewContent)}
				</DialogContent>
				<DialogActions>
					<Box p={1}>
						<Button color={"primary"} variant={"outlined"} onClick={download}>
							Download
						</Button>
					</Box>
				</DialogActions>
			</Dialog>
		</Grid>
	);
}
