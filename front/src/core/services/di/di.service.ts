import {ExampleService} from "../example";
import {AuthenticationService} from "../authentication";
import {ThemeService} from "../theme";
import {LocalStorageService} from "../localStorage";
import {Container} from "inversify";
import {DiKeysService} from "./di.keys.service"
export const container = new Container({defaultScope: "Singleton"})

container
	.bind<AuthenticationService>(DiKeysService.authentication)
	.to(AuthenticationService)

container
	.bind<ThemeService>(DiKeysService.theme)
	.to(ThemeService)

container
	.bind<ExampleService>(DiKeysService.example)
	.to(ExampleService)

container
	.bind<LocalStorageService>(DiKeysService.localStorage.settings)
	.toConstantValue(new LocalStorageService("elyspio-authentication-settings"))

container
	.bind<LocalStorageService>(DiKeysService.localStorage.validation)
	.toConstantValue(new LocalStorageService("elyspio-authentication-validation"))
