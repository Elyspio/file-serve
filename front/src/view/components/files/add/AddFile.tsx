import React from "react";
import { Autocomplete, Box, Button, Divider, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField } from "@mui/material";
import { Title } from "../../utils/title";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { login } from "../../../../store/module/authentication/authentication.action";
import { useHistory } from "react-router-dom";
import { addFile } from "../../../../store/module/files/files.action";

const fileTypes = {
	user: "user",
	public: "public",
} as const;

export function AddFile() {
	const {
		location: { state },
	} = useHistory<{ user: boolean; location?: string }>();

	const [fileType, setFileType] = React.useState<typeof fileTypes[keyof typeof fileTypes]>(state?.user ? "user" : "public");

	const logged = useAppSelector((s) => s.authentication.logged);

	const { user: userFiles, public: publicFiles } = useAppSelector((s) => s.files);

	const filePaths = React.useMemo(() => {
		return [...new Set((fileType === "user" ? userFiles : publicFiles).map((file) => file.location))];
	}, [userFiles, publicFiles, fileType]);

	const dispatch = useAppDispatch();

	const [file, setFile] = React.useState<File | null>(null);
	const [filename, setFilename] = React.useState("");
	const [location, setLocation] = React.useState(state?.location ?? "/");

	const create = React.useCallback(async () => {
		if (file !== null) {
			dispatch(addFile({ owner: fileType, filename, location, file }));
		}
	}, [dispatch, fileType, filename, file, location]);

	const handleFile = React.useCallback((e) => {
		const files = e.target.files;
		let file = files?.[0] ?? null;
		if (files !== null) {
			setFilename(file.name);
		}
		return setFile(file);
	}, []);

	if (!logged)
		return (
			<Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
				<Button onClick={() => dispatch(login())}>Please login before access to this page</Button>
			</Box>
		);

	const emptyFile = file === null;
	return (
		<Paper className={"AddFile"}>
			<Box px={8} py={4} width={"50vw"} maxWidth={600}>
				<Grid container direction={"column"} alignItems={"center"} spacing={6}>
					<Grid item container xs={12} alignItems={"center"} direction={"column"}>
						<Title>Add a file</Title>
						<Divider className={"Divider"} />
					</Grid>

					<Grid item xs={6} container>
						<FormControl fullWidth>
							<InputLabel id="settings-theme-label">Who can access to this file?</InputLabel>
							<Select
								size={"small"}
								labelId="settings-theme-label"
								id="settings-theme-select"
								value={fileType}
								label="Who can access to this file?"
								fullWidth
								onChange={(e) => setFileType(e.target.value as any)}
							>
								<MenuItem value={fileTypes.public}>Everyone</MenuItem>
								<MenuItem value={fileTypes.user}>Only me</MenuItem>
							</Select>
						</FormControl>
					</Grid>

					<Grid item xs={6} container>
						<Button color={"secondary"} variant="outlined" component="label" fullWidth title={emptyFile ? "Select a file" : "Replace selected file"}>
							Select File
							<input type="file" onChange={handleFile} hidden />
						</Button>
					</Grid>

					{!emptyFile && (
						<>
							<Grid item xs={6} container>
								<Autocomplete
									fullWidth
									size={"small"}
									id="free-solo-demo"
									freeSolo
									options={filePaths}
									value={location}
									renderInput={(params) => <TextField {...params} label="Location" onChange={(e) => setLocation(e.target.value as string)} />}
								/>
							</Grid>

							<Grid item xs={6} container>
								<FormControl fullWidth>
									<TextField
										size={"small"}
										id="outlined-basic"
										label="Filename"
										variant="outlined"
										value={filename}
										disabled={emptyFile}
										onChange={(e) => setFilename(e.target.value)}
									/>
								</FormControl>
							</Grid>

							<Grid item xs={12} container justifyContent={"center"}>
								<Button size={"large"} color={"primary"} variant={"outlined"} disabled={filename.length === 0 || emptyFile} onClick={create}>
									Create
								</Button>
							</Grid>
						</>
					)}
				</Grid>
			</Box>
		</Paper>
	);
}
