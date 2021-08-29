import {inject, injectable} from "inversify";
import {DiKeysApi} from "../di/di.keys.api";
import {BackendApi} from "../apis/backend";
import {FileModel, FileModelWithContent} from "../apis/backend/generated";
import {ToastOn} from "../utils/decorators";


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


	@ToastOn({error: "Could not add the public file"}, {concatArgs: ["filename"]})
	private async addPublic(filename: string, file: any) {
		return this.backendApi.clients.files.public.addFile(filename, file).then(x => x.data);
	}

	@ToastOn({error: "Could not delete the public file"}, {concatArgs: true})
	private async deletePublic(id: FileModel["id"]) {
		return this.backendApi.clients.files.public.deleteFile(id).then(x => x.data);
	}

	@ToastOn({error: "Could not list public files"})
	private async listPublic() {
		return this.backendApi.clients.files.public.listFiles().then(x => x.data);
	}

	@ToastOn({error: "Could not download the public file"}, {concatArgs: true})
	private async downloadPublic(id: FileModel["id"]) {
		const file = await this.public.get(id);
		await download(file);
	}

	@ToastOn({error: "Could not retrieve the public file"}, {concatArgs: true})
	private async getPublic(id: FileModel["id"]) {
		return this.backendApi.clients.files.public.getFile(id).then(x => x.data);
	}

	@ToastOn({error: "Could not retrieve the public file content"}, {concatArgs: true})
	private async getContentPublic(id: FileModel["id"]) {
		return this.backendApi.clients.files.public.getFileContent(id).then(x => x.data);
	}

	@ToastOn({error: "Could not add your file"}, {concatArgs: ["filename"]})
	private async addUser(filename: string, file: any) {
		return this.backendApi.clients.files.user.addFile(filename, file).then(x => x.data);
	}

	@ToastOn({error: "Could not delete your file"}, {concatArgs: true})
	private async deleteUser(id: FileModel["id"]) {
		return this.backendApi.clients.files.user.deleteFile(id).then(x => x.data);
	}

	@ToastOn({error: "Could not list your files"}, {concatArgs: true})
	private async listUser() {
		return this.backendApi.clients.files.user.listFiles().then(x => x.data);
	}

	@ToastOn({error: "Could not download your file"}, {concatArgs: true})
	private async downloadUser(id: FileModel["id"]) {
		const file = await this.user.get(id);
		await download(file);
	}

	@ToastOn({error: "Could not retrieve your file"}, {concatArgs: true})
	private async getUser(id: FileModel["id"]) {
		return this.backendApi.clients.files.user.getFile(id).then(x => x.data);
	}

	@ToastOn({error: "Could not retrieve your file content"}, {concatArgs: true})
	private async getContentUser(id: FileModel["id"]) {
		return this.backendApi.clients.files.user.getFileContent(id).then(x => x.data);
	}


	public public = {
		add: this.addPublic.bind(this),
		download: this.downloadPublic.bind(this),
		delete: this.deletePublic.bind(this),
		getContent: this.getContentPublic.bind(this),
		list: this.listPublic.bind(this),
		get: this.getPublic
	}
	public user = {
		add: this.addUser.bind(this),
		download: this.downloadUser.bind(this),
		delete: this.deleteUser.bind(this),
		getContent: this.getContentUser.bind(this),
		list: this.listUser.bind(this),
		get: this.getUser.bind(this)
	}



}
