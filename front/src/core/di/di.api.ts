import {DiKeysApi} from "./di.keys.api"
import {BackendApi} from "../apis/backend";
import {AuthenticationApi} from "../apis/authentication";
import {container} from "./index";


container
	.bind<BackendApi>(DiKeysApi.backend)
	.to(BackendApi)

container
	.bind<AuthenticationApi>(DiKeysApi.authentication)
	.to(AuthenticationApi)

