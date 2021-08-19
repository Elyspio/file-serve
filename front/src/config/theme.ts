import {createTheme, Theme} from "@material-ui/core";
import * as colors from "@material-ui/core/colors";
import {UserSettingsModel} from "../core/apis/authentication";
import {ThemeService} from "../core/services/theme";
import {DependencyInjection} from "../core/services/di";
import {LocalStorageService} from "../core/services/localStorage";

const darkTheme = createTheme(({
	palette: {
		type: "dark",
		secondary: {
			...colors.grey,
			main: colors.grey["500"],

		},
		primary: {
			...colors.teal,
			main: colors.teal["A400"],
		},
		background: {
			paper: "#1d1d1d",
			default: "#181818",
		}

	},
}));

const lightTheme = createTheme(({
	palette: {
		type: "light",
		secondary: {
			...colors.grey,
			main: colors.grey["900"],
		},
		primary: {
			...colors.blue,
			main: colors.blue["400"],
		},
	},
}));

export const themes = {
	dark: darkTheme,
	light: lightTheme,
};

export type Themes = "dark" | "light";
const themeService = DependencyInjection.container.get<ThemeService>(DependencyInjection.keys.theme);
const localStorageSettings = DependencyInjection.container.get<LocalStorageService>(DependencyInjection.keys.localStorage.settings);

export const getUrlTheme = (): Themes => {
	let fromUrl = new URL(window.location.toString()).searchParams.get("theme");
	let fromSession = localStorageSettings.retrieve<UserSettingsModel>()
	if (fromUrl) return fromUrl as Themes;
	if (fromSession?.theme) {
		if (fromSession.theme === "system") {
			return themeService.getThemeFromSystem();
		} else return fromSession.theme;
	}
	return "light";
};

export const getCurrentTheme = (theme: Themes): Theme => themes[theme];
