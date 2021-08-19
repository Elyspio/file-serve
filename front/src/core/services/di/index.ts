import {container} from "./di.service"
import {DiKeysService} from "./di.keys.service"

export const DependencyInjection =  {
	keys: DiKeysService,
	container,
}
