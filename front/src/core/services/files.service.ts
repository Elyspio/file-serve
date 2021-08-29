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


	@inject(DiKeysApi.backend)
	private backendApi!: BackendApi


	public public = {
		add: (filename: string, file: any) => {
			return this.backendApi.clients.files.public.addFile(filename, file).then(x => x.data);
		},
		delete: (id: FileModel["id"]) => {
			return this.backendApi.clients.files.public.deleteFile(id).then(x => x.data);
		},
		list: () => {
			return this.backendApi.clients.files.public.listFiles().then(x => x.data);
		},
		download: async (id: FileModel["id"]) => {
			const file = await this.public.get(id);
			await download(file);
		},
		get: (id: FileModel["id"]) => {
			return this.backendApi.clients.files.public.getFile(id).then(x => x.data);
		},
		getContent: (id: FileModel["id"]) => {
			return this.backendApi.clients.files.public.getFileContent(id).then(x => x.data);
		},
	}

	public user = {
		add: (filename: string, file: any) => {
			return this.backendApi.clients.files.user.addFile(filename, file).then(x => x.data);
		},
		delete: (id: FileModel["id"]) => {
			return this.backendApi.clients.files.user.deleteFile(id).then(x => x.data);
		},
		list: () => {
			return this.backendApi.clients.files.user.listFiles().then(x => x.data);
		},
		download: async (id: FileModel["id"]) => {
			const file = await this.user.get(id);
			await download(file);
		},
		get: (id: FileModel["id"]) => {
			return this.backendApi.clients.files.user.getFile(id).then(x => x.data);
		},
		getContent: (id: FileModel["id"]) => {
			return this.backendApi.clients.files.user.getFileContent(id).then(x => x.data);
		},
	}


}
