import {Box, Button, Container, Grid, IconButton, Paper} from "@material-ui/core";
import "./Files.scss"
import * as React from 'react';
import {FilesService} from "../../../core/services/files.service";
import {useInjection} from "inversify-react";
import {DiKeysService} from "../../../core/di/di.keys.service";
import {useAsyncState} from "../../hooks/useAsyncState";
import {FileDetail} from "./detail/FileDetail";
import {useAppDispatch, useAppSelector} from "../../../store";
import {AddCircle, Replay} from "@material-ui/icons";
import {Title} from "../utils/title";
import {push} from "connected-react-router";
import {routes} from "../../../config/routes";
import {login} from "../../../store/module/authentication/authentication.action";
import {AuthenticationEvents} from "../../../core/services/authentication.service";


export const Files = () => {

	const services = {
		files: useInjection<FilesService>(DiKeysService.files)
	}

	const logged = useAppSelector(s => s.authentication.logged);

	const common = useAsyncState(services.files.public.list, [])

	const getUserData = React.useCallback(() => {
		if (logged) return services.files.user.list();
		return Promise.resolve([])
	}, [logged, services.files.user])

	const {data: userData, reload: userReload} = useAsyncState(getUserData, [])

	React.useEffect(() => {
		AuthenticationEvents.on("login", () => {
			return userReload()
		})
	}, [userReload])

	// region callbacks

	const dispatch = useAppDispatch();

	const addFile = React.useCallback((user: boolean) => () => {
		dispatch(push({pathname: routes.addFile, state: {user}}));
	}, [dispatch])

	const redirectToLogin = React.useCallback(() => dispatch(login()), [dispatch]);

	// endregion

	return (
		<Container className={"Files"}>
			<Grid container spacing={4} direction={"row"}>
				<Grid
					item
					xs={6}
				>
					<Paper>
						<Box
							className={"files-container"}
							display={"flex"}
							flexDirection={"column"}
							alignItems={"center"}
							justifyContent={"center"}
							px={2}

						>
							<Box
								className={"file-header"}
								display={"flex"}
								alignItems={"center"}
								justifyContent={"space-between"}
								width={"100%"}

							>
								<Title>Common files</Title>
								<div className={"actions"}>
									<IconButton onClick={common.reload}><Replay/></IconButton>
									<IconButton onClick={addFile(false)}><AddCircle/></IconButton>
								</div>
							</Box>
							<Grid container direction={"column"} spacing={2}>
								{common.data.map(file => <Grid item key={file.id}>
									<FileDetail data={file} user={false}/>
								</Grid>)}
							</Grid>
						</Box>
					</Paper>
				</Grid>


				<Grid
					item
					xs={6}
				>
					<Paper>
						<Box
							width={"100%"}
							flexDirection={"column"}
							alignItems={"center"}
							className={"files-container"}
							justifyContent={"center"}
						>
							{logged
								? <Box
									display={"flex"}
									flexDirection={"column"}
									alignItems={"center"}
									justifyContent={"center"}
									px={2}

								>
									<Box
										className={"file-header"}
										display={"flex"}
										alignItems={"center"}
										justifyContent={"space-between"}
										width={"100%"}
									>
										<Title>Your's files</Title>
										<div className={"actions"}>
											<IconButton onClick={userReload}><Replay/></IconButton>
											<IconButton onClick={addFile(true)}><AddCircle/></IconButton>
										</div>
									</Box>
									<Grid container direction={"column"}>
										{userData.map(file => <Grid item key={file.id}>
											<FileDetail data={file} user={true}/>
										</Grid>)}
									</Grid>
								</Box>

								: <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
									<Button onClick={redirectToLogin}>Login to see your files</Button>
								</Box>
							}
						</Box>
					</Paper>
				</Grid>

			</Grid>
		</Container>
	);

}


