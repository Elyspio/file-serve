import { Box, Button, Container, Divider, Grid, IconButton, Paper } from "@material-ui/core";
import "./Files.scss";
import * as React from "react";
import { FileDetail } from "./detail/FileDetail";
import { useAppDispatch, useAppSelector } from "../../../store";
import { AddCircle, Replay } from "@material-ui/icons";
import { Title } from "../utils/title";
import { push } from "connected-react-router";
import { routes } from "../../../config/routes";
import { login } from "../../../store/module/authentication/authentication.action";
import { AuthenticationEvents } from "../../../core/services/authentication.service";
import { FileModel } from "../../../core/apis/backend/generated";
import { getFiles } from "../../../store/module/files/files.action";

export const Files = () => {
	const logged = useAppSelector((s) => s.authentication.logged);
	const { user: userFiles, public: publicFiles } = useAppSelector((s) => s.files);

	const dispatch = useAppDispatch();

	const reload = React.useCallback(
		(type: "user" | "public") => {
			dispatch(getFiles(type));
		},
		[dispatch]
	);

	const { reloadUser, reloadPublic } = React.useMemo(
		() => ({
			reloadUser: () => reload("user"),
			reloadPublic: () => reload("public"),
		}),
		[reload]
	);

	React.useEffect(() => {
		AuthenticationEvents.on("login", () => {
			return reloadUser();
		});
	}, [reloadUser]);

	// region callbacks

	const addFile = React.useCallback(
		(user: boolean) => () => {
			dispatch(push({ pathname: routes.addFile, state: { user } }));
		},
		[dispatch]
	);

	const redirectToLogin = React.useCallback(() => dispatch(login()), [dispatch]);

	React.useEffect(() => reloadPublic(), [reloadPublic]);

	// endregion

	return (
		<Container className={"Files"}>
			<Grid container spacing={4} direction={"row"}>
				<Grid item xs={6}>
					<Paper>
						<FileContainer user={false} title={"Public files"} add={addFile(false)} data={publicFiles} reload={reloadPublic} />
					</Paper>
				</Grid>

				<Grid item xs={6}>
					<Paper>
						{logged ? (
							<FileContainer user={true} title={"Your files"} add={addFile(true)} data={userFiles} reload={reloadUser} />
						) : (
							<Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
								<Button onClick={redirectToLogin}>Login to see your files</Button>
							</Box>
						)}

						{/*<video width={350} height={360} controls autoPlay muted>*/}
						{/*	<source src="/file-serve/files/public/61cb920e1159b9f3dcb23678/stream" type="video/mp4" />*/}
						{/*</video>*/}
					</Paper>
				</Grid>
			</Grid>
		</Container>
	);
};

type FileContainerProps = {
	data: FileModel[];
	reload: () => any;
	add: () => any;
	user: boolean;
	title: string;
};

function FileContainer({ add, reload, data, user, title }: FileContainerProps) {
	const logged = useAppSelector((s) => s.authentication.logged);

	return (
		<Box width={"100%"} flexDirection={"column"} alignItems={"center"} className={"files-container"} justifyContent={"center"}>
			<Box display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"} px={2}>
				<Box className={"file-header"} display={"flex"} alignItems={"center"} justifyContent={"space-between"} width={"100%"}>
					<Title>{title}</Title>
					<div className={"actions"}>
						<IconButton onClick={reload}>
							<Replay />
						</IconButton>
						{logged && (
							<IconButton onClick={add}>
								<AddCircle />
							</IconButton>
						)}
					</div>
				</Box>
				{data.length > 0 && (
					<Grid container direction={"column"} spacing={2}>
						<Box marginTop={2}>
							<Divider />
						</Box>
						{data.map((file) => (
							<Grid item key={file.id}>
								<FileDetail data={file} user={user} />
							</Grid>
						))}
					</Grid>
				)}
			</Box>
		</Box>
	);
}
