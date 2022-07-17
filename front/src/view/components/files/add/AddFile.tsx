import React from "react";
import { Autocomplete, Box, Button, Divider, FormControl, FormControlLabel, InputLabel, MenuItem, Paper, Select, Stack, Switch, TextField } from "@mui/material";
import { Title } from "../../utils/title";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { login } from "../../../../store/module/authentication/authentication.action";
import { addFile } from "../../../../store/module/files/files.action";
import { useLocationState } from "../../../hooks/useLocationState";
import { useInput } from "../../../hooks/useInput";

const fileTypes = {
	user: "user",
	public: "public",
} as const;

export function AddFile() {
	const state = useLocationState<{ user: boolean; location?: string }>();

	const [fileType, setFileType] = React.useState<typeof fileTypes[keyof typeof fileTypes]>(state?.user ? "user" : "public");
	const [file, setFile] = React.useState<File | null>(null);
	const [filename, setFilename] = React.useState("");
	const [hidden, setHidden] = React.useState(false);
	const [location, setLocation] = React.useState(state?.location ?? "/");
	const logged = useAppSelector((s) => s.authentication.logged);

	const dispatch = useAppDispatch();

	const { user: userFiles, public: publicFiles } = useAppSelector((s) => s.files);

	const filePaths = React.useMemo(() => {
		return [...new Set((fileType === "user" ? userFiles : publicFiles).map((file) => file.location))];
	}, [userFiles, publicFiles, fileType]);

	const setLocationCb = useInput(setLocation);
	const setFilenameCb = useInput(setFilename);
	const setFileTypeCb = useInput(setFileType);
	const setHiddenCb = useInput(setHidden, "checked");

	const create = React.useCallback(async () => {
		if (file !== null) {
			dispatch(addFile({ owner: fileType, filename, location, file, hidden }));
		}
	}, [dispatch, fileType, filename, file, location, hidden]);

	const handleFile = React.useCallback((e) => {
		const files = e.target.files;
		let file = files?.[0] ?? null;
		if (files !== null) {
			setFilename(file.name);
		}
		return setFile(file);
	}, []);

	if (!logged) {
		return (
			<Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
				<Button onClick={() => dispatch(login())}>Please login before access to this page</Button>
			</Box>
		);
	}

	const emptyFile = file === null;
	return (
		<Paper className={"AddFile"}>
			<Box px={8} py={4} width={"50vw"} maxWidth={600}>
				<Stack spacing={4}>
					<Title>Add a file</Title>
					<Divider></Divider>

					<Button color={"inherit"} variant="outlined" component="label" fullWidth title={emptyFile ? "Select a file" : "Replace selected file"}>
						Select File
						<input type="file" onChange={handleFile} hidden />
					</Button>
					{!emptyFile && (
						<>
							<FormControl fullWidth>
								<TextField size={"small"} id="set-filename" label="Filename" variant="outlined" value={filename} disabled={emptyFile} onChange={setFilenameCb} />
							</FormControl>

							<Autocomplete
								fullWidth
								size={"small"}
								id="free-solo-demo"
								freeSolo
								options={filePaths}
								value={location}
								renderInput={(params) => <TextField {...params} label="Location" onChange={setLocationCb} />}
							/>

							<FormControl fullWidth>
								<InputLabel id="add-file-access-label">Who can access to this file?</InputLabel>
								<Select
									size={"small"}
									labelId="add-file-access-label"
									id="add-file-access-select"
									value={fileType}
									label="Who can access to this file?"
									fullWidth
									onChange={setFileTypeCb}
								>
									<MenuItem value={fileTypes.public}>Everyone</MenuItem>
									<MenuItem value={fileTypes.user}>Only me</MenuItem>
								</Select>
							</FormControl>

							<Box>
								<FormControlLabel labelPlacement={"start"} control={<Switch onChange={setHiddenCb} />} label="Hidden" />
							</Box>

							<Button size={"large"} color={"primary"} variant={"outlined"} disabled={filename.length === 0 || emptyFile} onClick={create}>
								Create
							</Button>
						</>
					)}
				</Stack>
			</Box>
		</Paper>
	);
}
