import { inject, injectable } from "inversify";
import { DiKeysApi } from "../di/di.keys.api";
import { BackendApi } from "../apis/backend";
import { FileModel } from "../apis/backend/generated";
import { ToastOn } from "../utils/decorators";

function download({ content, name }: { name: string; content: Blob }) {
	const link = window.document.createElement("a");
	link.href = window.URL.createObjectURL(content);
	link.download = name;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}

@injectable()
export class FilesService {
	public public = {
		add: this.addPublic.bind(this),
		download: this.downloadPublic.bind(this),
		delete: this.deletePublic.bind(this),
		getContent: this.getContentPublic.bind(this),
		getContentAsString: this.getContentAsStringPublic.bind(this),
		list: this.listPublic.bind(this),
		get: this.getPublic.bind(this),
	};
	public user = {
		add: this.addUser.bind(this),
		download: this.downloadUser.bind(this),
		delete: this.deleteUser.bind(this),
		getContent: this.getContentUser.bind(this),
		getContentAsString: this.getContentAsStringUser.bind(this),
		list: this.listUser.bind(this),
		get: this.getUser.bind(this),
	};
	@inject(DiKeysApi.backend)
	private backendApi!: BackendApi;

	@ToastOn({ error: "Could not add the public file" }, { concatArgs: ["filename"] })
	private async addPublic(filename: string, location: string, file: File) {
		return this.backendApi.clients.files.public.addFile(filename, location, { fileName: filename, data: file });
	}

	@ToastOn({ error: "Could not delete the public file" }, { concatArgs: true })
	private async deletePublic(id: FileModel["id"]) {
		return this.backendApi.clients.files.public.deleteFile(id);
	}

	@ToastOn({ error: "Could not list public files" })
	private async listPublic() {
		return this.backendApi.clients.files.public.getFiles();
	}

	@ToastOn({ error: "Could not download the public file" }, { concatArgs: true })
	private async downloadPublic(id: FileModel["id"]) {
		const { data: file } = await this.public.get(id);
		const { data } = await this.public.getContent(id);
		await download({ name: file.filename, content: data });
	}

	@ToastOn({ error: "Could not retrieve the public file" }, { concatArgs: true })
	private async getPublic(id: FileModel["id"]) {
		return this.backendApi.clients.files.public.getFile(id);
	}

	@ToastOn({ error: "Could not retrieve the public file content" }, { concatArgs: true })
	private async getContentPublic(id: FileModel["id"]) {
		return this.backendApi.clients.files.public.getFileContent(id);
	}

	@ToastOn({ error: "Could not retrieve the public file content as string" }, { concatArgs: true })
	private async getContentAsStringPublic(id: FileModel["id"]) {
		return this.backendApi.clients.files.public.getFileContentAsString(id);
	}

	@ToastOn({ error: "Could not add your file" }, { concatArgs: ["filename"] })
	private async addUser(filename: string, location: string, file: File) {
		return this.backendApi.clients.files.user.addFile(filename, location, { fileName: filename, data: file });
	}

	@ToastOn({ error: "Could not delete your file" }, { concatArgs: true })
	private async deleteUser(id: FileModel["id"]) {
		return this.backendApi.clients.files.user.deleteFile(id);
	}

	@ToastOn({ error: "Could not list your files" }, { concatArgs: true })
	private async listUser() {
		return this.backendApi.clients.files.user.getFiles();
	}

	@ToastOn({ error: "Could not download your file" }, { concatArgs: true })
	private async downloadUser(id: FileModel["id"]) {
		const { data: file } = await this.user.get(id);
		const { data } = await this.user.getContent(id);
		await download({ name: file.filename, content: data });
	}

	@ToastOn({ error: "Could not retrieve your file" }, { concatArgs: true })
	private async getUser(id: FileModel["id"]) {
		return this.backendApi.clients.files.user.getFile(id);
	}

	@ToastOn({ error: "Could not retrieve your file content" }, { concatArgs: true })
	private async getContentUser(id: FileModel["id"]) {
		return this.backendApi.clients.files.user.getFileContent(id);
	}

	@ToastOn({ error: "Could not retrieve the public file content as string" }, { concatArgs: true })
	private async getContentAsStringUser(id: FileModel["id"]) {
		return this.backendApi.clients.files.user.getFileContentAsString(id);
	}
}
