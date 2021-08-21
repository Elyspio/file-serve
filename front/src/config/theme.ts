import {createTheme, Theme} from "@material-ui/core";
import * as colors from "@material-ui/core/colors";
import {UserSettingsModel} from "../core/apis/authentication/generated";
import {ThemeService} from "../core/services/theme.service";
import {LocalStorageService} from "../core/services/localStorage.service";
import {container} from "../core/di/di.container";
import {DiKeysService} from "../core/di/di.keys.service";

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
const themeService = container.get<ThemeService>(DiKeysService.theme);
const localStorageSettings = container.get<LocalStorageService>(DiKeysService.localStorage.settings);

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
