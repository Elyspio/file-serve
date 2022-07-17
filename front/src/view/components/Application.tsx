import * as React from "react";
import "./Application.scss";
import Brightness5Icon from "@mui/icons-material/Brightness5";
import Brightness3Icon from "@mui/icons-material/Brightness3";
import { Files } from "./files/Files";
import { useAppDispatch, useAppSelector } from "../../store";
import { toggleTheme } from "../../store/module/theme/theme.action";
import { createDrawerAction, withDrawer } from "./utils/drawer/Drawer.hoc";
import { Box } from "@mui/material";
import Login from "@mui/icons-material/AccountCircle";
import { ReactComponent as Logout } from "../icons/logout.svg";
import { login, logout, silentLogin } from "../../store/module/authentication/authentication.action";
import { updateToastTheme } from "./utils/toast";
import { Route, Routes } from "react-router";
import { Routes as IRoutes, routes } from "../../config/routes";
import { AddFile } from "./files/add/AddFile";
import { Home } from "@mui/icons-material";
import { push } from "redux-first-history";
import { getFiles } from "../../store/module/files/files.action";
import { AuthenticationEvents } from "../../core/services/authentication.service";
import { useAsyncEffect } from "../hooks/useAsyncEffect";

function Application() {
	const dispatch = useAppDispatch();

	const { theme, themeIcon, logged } = useAppSelector((s) => ({
		theme: s.theme.current,
		themeIcon: s.theme.current === "dark" ? <Brightness5Icon /> : <Brightness3Icon />,
		logged: s.authentication.logged,
	}));

	React.useEffect(() => updateToastTheme(theme), [theme]);

	// region actions

	const actions = [
		createDrawerAction(theme === "dark" ? "Light Mode" : "Dark Mode", {
			icon: themeIcon,
			onClick: () => dispatch(toggleTheme()),
		}),
	];

	if (logged) {
		actions.push(
			createDrawerAction("Logout", {
				icon: <Logout fill={"currentColor"} />,
				onClick: () => dispatch(logout()),
			})
		);
	} else {
		actions.push(
			createDrawerAction("Login", {
				icon: <Login fill={"currentColor"} />,
				onClick: () => dispatch(login()),
			})
		);
	}

	const { home } = useAppSelector((s) => {
		const path = s.router.location?.pathname;
		const obj: { [key in IRoutes]?: boolean } = {};
		Object.keys(routes).forEach((key) => {
			obj[key] = path === routes[key];
			return obj;
		});
		return obj;
	});

	if (!home) {
		actions.push(
			createDrawerAction("Home", {
				icon: <Home fill={"currentColor"} />,
				onClick: () => dispatch(push(routes.home)),
			})
		);
	}

	// endregion

	// region getFiles

	React.useEffect(() => {
		AuthenticationEvents.on("login", () => {
			dispatch(getFiles({ owner: "user" }));
			dispatch(getFiles({ owner: "public" }));
		});
	}, [dispatch]);

	useAsyncEffect(async () => {
		const { payload } = await dispatch(silentLogin());
		if (!payload) {
			dispatch(getFiles({ owner: "public" }));
		}
	}, [dispatch]);

	// endregion

	const drawer = withDrawer({
		component: (
			<Routes>
				<Route path={routes.home} element={<Files />} />
				<Route path={routes.addFile} element={<AddFile />} />
			</Routes>
		),
		actions,
		title: "Files",
	});

	return (
		<Box className={"Application"} bgcolor={"background.default"}>
			{drawer}
		</Box>
	);
}

export default Application;
