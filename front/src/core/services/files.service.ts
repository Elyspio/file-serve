import { inject, injectable } from "inversify";
import { BackendApi } from "../apis/backend";
import { FileData } from "../apis/backend/generated";

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
		getLink: this.getLinkPublic.bind(this),
		toggleVisibility: this.toggleVisibilityPublic.bind(this),
	};
	public user = {
		add: this.addUser.bind(this),
		download: this.downloadUser.bind(this),
		delete: this.deleteUser.bind(this),
		getContent: this.getContentUser.bind(this),
		getContentAsString: this.getContentAsStringUser.bind(this),
		list: this.listUser.bind(this),
		get: this.getUser.bind(this),
		getLink: this.getLinkUser.bind(this),
		toggleVisibility: this.toggleVisibilityUser.bind(this),
	};
	@inject(BackendApi)
	private backendApi!: BackendApi;

	private async getLinkPublic(id: string) {
		const url = `${window.config.endpoints.core}/api/files/public/${id}/binary`;
		await navigator.clipboard.writeText(url);
	}

	private async getLinkUser(id: string) {
		const url = `${window.config.endpoints.core}/api/files/user/${id}/binary`;
		await navigator.clipboard.writeText(url);
	}

	private async addPublic(filename: string, location: string, file: File, hidden: boolean) {
		return this.backendApi.clients.files.public.addFile(filename, location, file, hidden).then((x) => x.data);
	}

	private async deletePublic(id: FileData["id"]) {
		return this.backendApi.clients.files.public.deleteFile(id);
	}

	private async listPublic() {
		return this.backendApi.clients.files.public.getFiles().then((x) => x.data);
	}

	private async downloadPublic(id: FileData["id"]) {
		const file = await this.public.get(id);
		const content = await this.public.getContent(id);
		await download({ name: file.filename, content });
	}

	private async getPublic(id: FileData["id"]) {
		return this.backendApi.clients.files.public.getFile(id).then((x) => x.data);
	}

	private async getContentPublic(id: FileData["id"]) {
		return this.backendApi.clients.files.public.getFileContent(id, { responseType: "blob" }).then((x) => x.data as Blob);
	}

	private async getContentAsStringPublic(id: FileData["id"]) {
		return this.backendApi.clients.files.public.getFileContentAsString(id).then((x) => x.data);
	}

	private async toggleVisibilityPublic(id: FileData["id"]) {
		await this.backendApi.clients.files.public.toggleVisibility(id);
	}

	private async addUser(filename: string, location: string, file: File, hidden: boolean) {
		return this.backendApi.clients.files.user.addFile(filename, location, file, hidden).then((x) => x.data);
	}

	private async deleteUser(id: FileData["id"]) {
		return this.backendApi.clients.files.user.deleteFile(id);
	}

	private async listUser() {
		return this.backendApi.clients.files.user.getFiles().then((x) => x.data);
	}

	private async downloadUser(id: FileData["id"]) {
		const file = await this.user.get(id);
		const content = await this.user.getContent(id);
		await download({ name: file.filename, content });
	}

	private async getUser(id: FileData["id"]) {
		return this.backendApi.clients.files.user.getFile(id).then((x) => x.data);
	}

	private async getContentUser(id: FileData["id"]) {
		return this.backendApi.clients.files.user.getFileContent(id, undefined, undefined, { responseType: "blob" }).then((x) => x.data as Blob);
	}

	private async getContentAsStringUser(id: FileData["id"]) {
		return this.backendApi.clients.files.user.getFileContentAsString(id).then((x) => x.data);
	}

	private async toggleVisibilityUser(id: FileData["id"]) {
		await this.backendApi.clients.files.user.toggleVisibility(id);
	}
}
