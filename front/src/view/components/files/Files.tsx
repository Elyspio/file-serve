import {Box, Button, Container, Grid, IconButton, Paper} from "@material-ui/core";
import "./Files.scss"
import * as React from 'react';
import {Dispatch, SetStateAction} from 'react';
import {FilesService} from "../../../core/services/files.service";
import {useInjection} from "inversify-react";
import {DiKeysService} from "../../../core/di/di.keys.service";
import {useAsyncState} from "../../hooks/useAsyncState";
import {File} from "./file/File";
import {useAppDispatch, useAppSelector} from "../../../store";
import {AddCircle, Replay} from "@material-ui/icons";
import {Title} from "../utils/title";
import {push} from "connected-react-router";
import {routes} from "../../../config/routes";
import {login} from "../../../store/module/authentication/authentication.action";


function parseHook<S>(arg: [S, Dispatch<SetStateAction<S>>]) {
	return {
		get: arg[0],
		set: arg[1]
	}
}

export const Files = () => {

	const services = {
		files: useInjection<FilesService>(DiKeysService.files)
	}

	const logged = useAppSelector(s => s.authentication.logged);

	const common = {
		...useAsyncState(services.files.list.common, []),
		showActions: parseHook(React.useState(false)),
	}

	const user = {
		...useAsyncState(services.files.list.user, []),
		showActions: parseHook(React.useState(false)),
	}

	const dispatch = useAppDispatch();

	const addFile = React.useCallback(() => {
		dispatch(push(routes.addFile));
	}, [dispatch])

	const redirectToLogin = React.useCallback(() => dispatch(login()), [dispatch]);


	return (
		<Container className={"Files"}>
			<Grid container spacing={4} direction={"row"}>
				<Grid item xs={6}>
					<Paper>
						<Box
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
								onMouseOver={() => common.showActions.set(true)}
								onMouseOut={() => common.showActions.set(false)}
							>
								<Title>Common files</Title>
								<div className={"actions"}>
									<IconButton onClick={common.reload}><Replay/></IconButton>
									<IconButton onClick={addFile}><AddCircle/></IconButton>
								</div>
							</Box>
							<Grid container direction={"column"}>
								{common.data.map(file => <Grid item>
									<File data={file} user={false}/>
								</Grid>)}
							</Grid>
						</Box>
					</Paper>
				</Grid>


				<Grid item xs={6}>
					<Paper>
						<Box width={"100%"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
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
										onMouseOver={() => user.showActions.set(true)}
										onMouseOut={() => user.showActions.set(false)}
									>
										<Title>Your's files</Title>
										<div className={"actions"}>
											<IconButton onClick={user.reload}><Replay/></IconButton>
											<IconButton onClick={addFile}><AddCircle/></IconButton>
										</div>
									</Box>
									<Grid container direction={"column"}>
										{user.data.map(file => <Grid item>
											<File data={file} user={true}/>
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


