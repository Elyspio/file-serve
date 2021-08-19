import {CircularProgress, Container, Grid} from "@material-ui/core";
import "./Test.scss"
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import * as React from 'react';
import {useAsyncEffect} from "../../hooks/useAsyncEffect";
import {useAsyncCallback} from "../../hooks/useAsyncCallback";
import {AuthenticationEvents} from "../../../core/services/authentication";
import {ExampleService} from "../../../core/services/example";
import {useInjection} from "inversify-react";
import {DependencyInjection} from "../../../core/services/di";

const Test = () => {

	const services = {
		example: useInjection<ExampleService>(DependencyInjection.keys.example)
	}


	const [msg, setMsg] = React.useState("");
	const [admin, setAdmin] = React.useState("");

	const [fetchAdmin, {isExecuting, error}] = useAsyncCallback(async () => {
		const data = await services.example.getAdminContent();
		if (data) {
			setAdmin(data)
		}
	}, [])


	useAsyncEffect(async () => {
		const {data} = await services.example.getContent();
		setMsg(data)

		AuthenticationEvents.on("login", () => {
			fetchAdmin();
		})
	}, [])


	return (
		<Container className={"Test"}>


			<Grid container direction={"column"} spacing={2}>

				<Grid item container alignItems={"center"} spacing={4}>
					<Grid item><Typography color={"textPrimary"} variant={"overline"}>Test</Typography></Grid>
					<Grid item><Typography color={"textSecondary"}>{msg}</Typography></Grid>
				</Grid>

				<Grid item container alignItems={"center"} spacing={4}>
					<Grid item><Typography color={"textPrimary"} variant={"overline"}>Test (Admin)</Typography></Grid>
					<Button color={"primary"} style={{width: "12rem", height: "2.5rem"}} variant={"outlined"} onClick={fetchAdmin}>{isExecuting ? <CircularProgress/> : "Fetch admin"}</Button>
					<Grid item><Typography color={"textSecondary"}>{admin}</Typography></Grid>
					{error && <Grid item><Typography color={"error"}>{error.toString()}</Typography></Grid>}
				</Grid>
			</Grid>


		</Container>
	);

}


export default Test;
