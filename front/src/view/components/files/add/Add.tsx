import React from 'react';
import {Box, Button, Divider, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField} from "@material-ui/core";
import {Title} from "../../utils/title";
import "./Add.scss"
import {useInjection} from "inversify-react";
import {FilesService} from "../../../../core/services/files.service";
import {DiKeysService} from "../../../../core/di/di.keys.service";
import {useAppDispatch, useAppSelector} from "../../../../store";
import {push} from "connected-react-router";
import {routes} from "../../../../config/routes";
import {login} from "../../../../store/module/authentication/authentication.action";

const fileTypes = {
	user: "user",
	common: "common"
} as const

export function Add() {

	const services = {
		files: useInjection<FilesService>(DiKeysService.files)
	}

	const logged = useAppSelector(s => s.authentication.logged);
	const dispatch = useAppDispatch();

	const [fileType, setFileType] = React.useState<typeof fileTypes[keyof typeof fileTypes]>("user");
	const [files, setFile] = React.useState<FileList | null>(null)
	const [filename, setFilename] = React.useState("")

	const create = async () => {
		if (files !== null && files.length > 0) {
			await services.files.add[fileType](filename, files[0])
			dispatch(push(routes.home))
		}
	}


	const handleFile = React.useCallback((e) => {
		const files: FileList | null = e.target.files;
		if (files !== null) {
			setFilename(files[0].name);
		}
		return setFile(files);
	}, [])


	if (!logged) return <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
		<Button onClick={() => dispatch(login())}>Please login before access to this page</Button>
	</Box>

	return <Paper className={"Add"}>
		<Box px={4} py={4}>
			<Grid container direction={"column"} alignItems={"center"} spacing={6}>

				<Grid item xs={12} container alignItems={"center"} direction={"column"}>
					<Title>Add a file</Title>
					<Divider className={"Divider"}/>
				</Grid>

				<Grid item xs={12} container>
					<FormControl fullWidth>
						<TextField
							id="outlined-basic"
							label="Filename"
							variant="outlined"
							value={filename}
							onChange={e => setFilename(e.target.value)}
						/>
					</FormControl>
				</Grid>

				<Grid item xs={12} container>
					<FormControl fullWidth>
						<InputLabel id="settings-theme-label">Who can access to this file?</InputLabel>
						<Select
							labelId="settings-theme-label"
							id="settings-theme-select"
							value={fileType}
							label="Theme"
							fullWidth
							onChange={(e) => setFileType(e.target.value as any)}
						>
							<MenuItem value={fileTypes.common}>Everyone</MenuItem>
							<MenuItem value={fileTypes.user}>Only me</MenuItem>
						</Select>
					</FormControl>
				</Grid>

				<Grid item xs={12}>
					<Button
						variant="outlined"
						component="label"
					>
						Upload File
						<input
							type="file"
							onChange={handleFile}
							hidden
						/>
					</Button>
				</Grid>


				<Grid item xs={12} container justifyContent={"center"}>
					<Button
						color={"primary"}
						variant={"outlined"}
						disabled={filename.length === 0 || files === null || files?.length === 0}
						onClick={create}
					>
						Create
					</Button>
				</Grid>
			</Grid>
		</Box>


	</Paper>


}

