import {Container, Grid} from "@material-ui/core";
import "./Files.scss"
import * as React from 'react';
import {FilesService} from "../../../core/services/files.service";
import {useInjection} from "inversify-react";
import {DiKeysService} from "../../../core/di/di.keys.service";

export const Files = () => {

	const services = {
		files: useInjection<FilesService>(DiKeysService.files)
	}


	return (
		<Container className={"Test"}>


			<Grid container direction={"column"} spacing={2}>


			</Grid>


		</Container>
	);

}


