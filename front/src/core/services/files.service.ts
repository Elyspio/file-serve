import {inject, injectable} from "inversify";
import {DiKeysApi} from "../di/di.keys.api";
import {BackendApi} from "../apis/backend";

@injectable()
export class FilesService {


	@inject(DiKeysApi.backend)
	private backendApi!: BackendApi

	list = {
		common: () => {
			return this.backendApi.clients.files.listCommonFiles().then(x => x.data);
		},
		mine: () => {
			return this.backendApi.clients.files.listUserFiles().then(x => x.data);
		}
	}

	get = {
		common: (filename: string) => {
			return this.backendApi.clients.files.getCommonFile(filename).then(x => x.data);
		},
		mine: (filename: string) => {
			return this.backendApi.clients.files.getUserFile(filename).then(x => x.data);
		}
	}


}
