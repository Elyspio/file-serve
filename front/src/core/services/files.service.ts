import {inject, injectable} from "inversify";
import {DiKeysApi} from "../di/di.keys.api";
import {BackendApi} from "../apis/backend";
import {FileModel, FileModelWithContent} from "../apis/backend/generated";


function download({name, mime, content}: FileModelWithContent) {
	const bytes = atob(content)
		.split('')
		.map(char => char.charCodeAt(0))

	const blob = new Blob([new Uint8Array(bytes)], {type: mime,})

	const link = window.document.createElement("a");
	link.href = window.URL.createObjectURL(blob);
	link.download = name;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}


@injectable()
export class FilesService {

	public download = {
		common: async (id: FileModel["id"]) => {
			const file = await this.get.common(id);
			await download(file);
		},
		user: async (id: FileModel["id"]) => {
			const file = await this.get.user(id);
			await download(file);
		}
	}
	@inject(DiKeysApi.backend)
	private backendApi!: BackendApi
	public list = {
		common: () => {
			return this.backendApi.clients.files.listCommonFiles().then(x => x.data);
		},
		user: () => {
			return this.backendApi.clients.files.listUserFiles().then(x => x.data);
		}
	}
	public get = {
		common: (id: FileModel["id"]) => {
			return this.backendApi.clients.files.getCommonFile(id).then(x => x.data);
		},
		user: (id: FileModel["id"]) => {
			return this.backendApi.clients.files.getUserFile(id).then(x => x.data);
		}
	}
	public delete = {
		common: (id: FileModel["id"]) => {
			return this.backendApi.clients.files.deleteCommonFile(id).then(x => x.data);
		},
		user: (id: FileModel["id"]) => {
			return this.backendApi.clients.files.deleteUserFile(id).then(x => x.data);
		}
	}

	public add = {
		common: (filename: string, file: any) => {
			return this.backendApi.clients.files.addCommonFile(filename, file).then(x => x.data);
		},
		user: (filename: string, file: any) => {
			return this.backendApi.clients.files.addUserFile(filename, file).then(x => x.data);
		}
	}


}
