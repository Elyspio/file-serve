import React, {useCallback, useEffect, useState} from 'react';
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Typography} from "@material-ui/core";
import {useInjection} from "inversify-react";
import {DiKeysService} from "../../../../core/di/di.keys.service";
import {FilesService} from "../../../../core/services/files.service";
import {FileModel} from "../../../../core/apis/backend/generated";
import {Close, GetApp, Visibility} from "@material-ui/icons";
import {useModal} from "../../../hooks/useModal";
import {useAppSelector} from "../../../../store";
import {themes} from "../../../../config/theme";


type FileProps = {
	data: FileModel,
	user?: boolean
}

export function File({data: {id, name}, user}: FileProps) {

	const [previewContent, setPreviewContent] = useState("")
	const {setOpen, open, setClose} = useModal(false)

	const services = {
		files: useInjection<FilesService>(DiKeysService.files)
	}

	const download = useCallback(() => {
		const func = user ? services.files.download.user : services.files.download.common;
		return func(id);
	}, [services.files, user, id])

	const del = useCallback(() => {
		const func = user ? services.files.delete.user : services.files.delete.common;
		return func(id);
	}, [services.files, user, id])

	const view = useCallback(async (e) => {
		const func = user ? services.files.get.user : services.files.get.common;
		const file = await func(id);
		const content = Buffer.from(file.content, "base64").toString("utf-8")
		setOpen(e);
		setPreviewContent(content);
	}, [services.files, user, id, setOpen])


	const colors = useAppSelector(s => {
		const dark = s.theme.current === "dark";
		return {
			download: dark ? themes[s.theme.current].palette.primary.main : themes[s.theme.current].palette.primary.main,
			del: dark ? themes[s.theme.current].palette.error.main : themes[s.theme.current].palette.error.main,
			view: dark ? themes[s.theme.current].palette.secondary.main : themes[s.theme.current].palette.secondary.main,
		}
	})


	useEffect(() => {
		if (!open) setTimeout(() => setPreviewContent(""), 150)
	}, [open])


	return (

		<Grid className={"File"} container alignItems={"center"} justifyContent={"space-between"}>
			<Grid item xs={6}>
				<Typography color={"textPrimary"}>{name}</Typography>
			</Grid>

			<Grid container xs={6} item direction={"row"} alignItems={"center"} justifyContent={"flex-end"} wrap={"nowrap"} spacing={1}>
				<Grid item>
					<IconButton title={"Preview file"} onClick={view}><Visibility style={{fill: colors.view}}/></IconButton>
				</Grid>

				<Grid item>
					<IconButton title={"Download file"} onClick={download}><GetApp style={{fill: colors.download}}/></IconButton>
				</Grid>

				<Grid item>
					<IconButton title={"Delete file"} onClick={del}><Close style={{fill: colors.del}}/></IconButton>
				</Grid>
			</Grid>


			<Dialog onClose={setClose} aria-labelledby={`file-dialog-${name}`} open={open} maxWidth={false}>
				<DialogTitle id={`file-dialog-${name}-title`}>
					{name}
				</DialogTitle>
				<DialogContent dividers style={{width: "50vw"}}>
					<Typography color={"textSecondary"}>
						<pre>
							{previewContent}
						</pre>
					</Typography>
				</DialogContent>
				<DialogActions>
					<Box p={1}>
						<Button color={"primary"} variant={"outlined"} onClick={download}>Download</Button>
					</Box>
				</DialogActions>
			</Dialog>

		</Grid>


	);
}

