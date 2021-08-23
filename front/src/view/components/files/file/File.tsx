import React, {useCallback} from 'react';
import {Button, Grid, Typography} from "@material-ui/core";
import {useInjection} from "inversify-react";
import {DiKeysService} from "../../../../core/di/di.keys.service";
import {FilesService} from "../../../../core/services/files.service";
import {FileModel} from "../../../../core/apis/backend/generated";


type FileProps = {
	data: FileModel,
	user?: boolean
}

export function File({data: {id, name}, user}: FileProps) {

	const services = {
		files: useInjection<FilesService>(DiKeysService.files)
	}

	const download = useCallback(() => {
		const func = user ? services.files.get.user : services.files.get.common;
		return func(id);
	}, [services.files, user, id])

	const del = useCallback(() => {
		const func = user ? services.files.delete.user : services.files.delete.common;
		return func(id);
	}, [services.files, user, id])

	return (
		<Grid className={"File"} container alignItems={"center"} justifyContent={"space-between"} spacing={2}>
			<Grid item>
				<Typography color={"textPrimary"}>{name}</Typography>
			</Grid>
			<Grid item>
				<Button onClick={download}><Typography variant={"overline"} color={"secondary"}>download</Typography> </Button>
			</Grid>
			<Grid item>
				<Button onClick={del}><Typography variant={"overline"} color={"error"}>delete</Typography></Button>
			</Grid>
		</Grid>
	);
}

