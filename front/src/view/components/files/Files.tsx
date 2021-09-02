import {Box, Button, Container, Divider, Grid, IconButton, Paper} from "@material-ui/core";
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
import {FileModel} from "../../../core/apis/backend/generated";


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
						<FileContainer
							user={false}
							title={"Public files"}
							add={addFile(false)}
							data={common.data}
							reload={common.reload}
						/>
					</Paper>
				</Grid>

				<Grid
					item
					xs={6}
				>
					<Paper>
						{logged
							? <FileContainer
								user={true}
								title={"Your files"}
								add={addFile(true)}
								data={userData}
								reload={userReload}
							/>
							: <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
								<Button onClick={redirectToLogin}>Login to see your files</Button>
							</Box>}
					</Paper>
				</Grid>

			</Grid>
		</Container>
	);

}

type FileContainerProps = {
	data: FileModel[],
	reload: () => any,
	add: () => any,
	user: boolean,
	title: string
}

function FileContainer({add, reload, data, user, title}: FileContainerProps) {

	const logged = useAppSelector(s => s.authentication.logged);

	return <Box
		width={"100%"}
		flexDirection={"column"}
		alignItems={"center"}
		className={"files-container"}
		justifyContent={"center"}
	>
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
			>
				<Title>{title}</Title>
				<div className={"actions"}>
					<IconButton onClick={reload}><Replay/></IconButton>
					{logged && <IconButton onClick={add}><AddCircle/></IconButton>}
				</div>
			</Box>
			{data.length > 0 && <Grid container direction={"column"} spacing={2}>
                <Box marginTop={2}><Divider/></Box>
				{data.map(file => <Grid item key={file.id}>
					<FileDetail data={file} user={user}/>
				</Grid>)}
            </Grid>}
		</Box>


	</Box>
}


