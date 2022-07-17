import { Button, Container, Divider, DividerProps, Grid, Paper } from "@mui/material";
import "./Files.scss";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { Title } from "../utils/title";
import { login } from "../../../store/module/authentication/authentication.action";
import { FilesExplorer } from "./explorer/FilesExplorer";
import { VisualisationOptions } from "./explorer/VisualisationOptions";

const Divide = (props: DividerProps) => <Divider {...props} sx={{ width: "100%", height: "1px", my: 2 }} light />;

export const Files = () => {
	const logged = useAppSelector((s) => s.authentication.logged);
	const { user: userFiles, public: publicFiles } = useAppSelector((s) => s.files);

	const dispatch = useAppDispatch();

	const redirectToLogin = React.useCallback(() => dispatch(login()), [dispatch]);

	return (
		<Container className={"Files"}>
			<Grid container spacing={4} direction={"row"} my={2} height={"95%"}>
				<Grid item xs={6}>
					<Paper sx={{ height: "100%" }}>
						<Grid direction={"column"} alignItems={"center"} container height={"100%"}>
							<Grid item>
								<Title>Public</Title>
							</Grid>
							<Divide />
							<Grid item container>
								<FilesExplorer files={publicFiles} owner={"public"} />
							</Grid>
							<Grid item container sx={{ marginTop: "auto", py: 2 }}>
								<Divide />
								<VisualisationOptions owner={"public"} />
							</Grid>
						</Grid>
					</Paper>
				</Grid>

				<Grid item xs={6}>
					<Paper sx={{ height: "100%" }}>
						{logged ? (
							<>
								<Grid direction={"column"} alignItems={"center"} container height={"100%"}>
									<Grid item>
										<Title>Your's</Title>
									</Grid>
									<Divide />
									<Grid item container>
										<FilesExplorer files={userFiles} owner={"user"} />
									</Grid>

									<Grid item container sx={{ marginTop: "auto" }}>
										<Divide />
										<VisualisationOptions owner={"user"} />
									</Grid>
								</Grid>
							</>
						) : (
							<Grid container alignItems={"center"} justifyContent={"center"} height={"100%"}>
								<Grid item>
									<Button variant={"outlined"} onClick={redirectToLogin}>
										Login to see your files
									</Button>
								</Grid>
							</Grid>
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
