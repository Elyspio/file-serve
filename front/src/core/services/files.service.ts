import {inject, injectable} from "inversify";
import {DiKeysApi} from "../di/di.keys.api";
import {BackendApi} from "../apis/backend";
import {FileModel} from "../apis/backend/generated";

@injectable()
export class FilesService {


	@inject(DiKeysApi.backend)
	private backendApi!: BackendApi

	list = {
		common: () => {
			return this.backendApi.clients.files.listCommonFiles().then(x => x.data);
		},
		user: () => {
			return this.backendApi.clients.files.listUserFiles().then(x => x.data);
		}
	}

	get = {
		common: (id: FileModel["id"]) => {
			return this.backendApi.clients.files.getCommonFile(id).then(x => x.data);
		},
		user: (id: FileModel["id"]) => {
			return this.backendApi.clients.files.getUserFile(id).then(x => x.data);
		}
	}


	delete = {
		common: (id: FileModel["id"]) => {
			return this.backendApi.clients.files.deleteCommonFile(id).then(x => x.data);
		},
		user: (id: FileModel["id"]) => {
			return this.backendApi.clients.files.deleteUserFile(id).then(x => x.data);
		}
	}


	add = {
		common: (filename: string, file: any) => {
			return this.backendApi.clients.files.addCommonFile(filename, file).then(x => x.data);
		},
		user: (filename: string, file: any) => {
			return this.backendApi.clients.files.addUserFile(filename, file).then(x => x.data);
		}
	}


}
