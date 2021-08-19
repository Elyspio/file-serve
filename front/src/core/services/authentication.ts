import {Apis} from "../apis";
import {openPage} from "../utils/web";
import {EventManager} from "../utils/event";
import {inject, injectable} from "inversify";
import {ThemeService} from "./theme";
import {DiKeysService} from "./di/di.keys.service";

@injectable()
export class AuthenticationService {


	@inject(DiKeysService.theme)
	private themeService!: ThemeService


	public openLoginPage() {
		return openPage(window.config.loginPageUrl);
	}

	public getUsername() {
		return Apis.authentication.user.getCookieInfo("username").then(x => x.data);
	}

	public getToken() {
		return Apis.authentication.user.getCookieInfo("token").then(x => x.data);
	}

	public getCredentials(username: string) {
		return Apis.authentication.user.getUserCredentials(username).then(x => x.data);
	}

	public getSettings(username: string) {
		return Apis.authentication.user.getUserSettings(username).then(x => x.data);
	}

	public async getUserTheme(username: string) {
		let theme = await this.themeService.getThemeFromSystem();
		return Apis.authentication.user.getUserTheme(
			username,
			theme
		).then(x => x.data.theme);
	}

	public isLogged() {
		return Apis.authentication.login.validToken().then(x => x.data);
	}

	public async logout() {
		await Apis.authentication.login.logout()
	}

}

export const AuthenticationEvents = new EventManager<{
	login: (username: string) => void
	logout: () => void
}>();

