import {Service} from "@tsed/common";
import {FileRepository} from "../database/repositories/file.repository";
import {UserRepository} from "../database/repositories/user.repository";
import {Log} from "../utils/decorators/logger";
import {getLogger} from "../utils/logger";

@Service()
export class FileService {
	static exceptions = {
		fileNotFound: new Error("File not found"),
		notAuthorized: new Error("This is not your file !!l")
	}
	private static log = getLogger.service(FileService)
	private commonUsername = "common";

	private repositories: { files: FileRepository; users: UserRepository };

	constructor(fileRepository: FileRepository, userRepository: UserRepository) {
		this.repositories = {
			files: fileRepository,
			users: userRepository
		}
	}


	@Log(FileService.log, {level: "debug", arguments: []})
	async getCommonFile(id: number) {
		return this.getFileContent(id, this.commonUsername);
	}

	@Log(FileService.log, {level: "debug", arguments: []})
	async getFileContent(id: number, username: string) {
		const file = await this.repositories.files.findById(id);
		if (!file) throw FileService.exceptions.fileNotFound
		if (file.user.username !== username) throw FileService.exceptions.notAuthorized
		return new Buffer(file.content, 'base64').toString("utf8")
	}

	@Log(FileService.log, {level: "debug", arguments: []})
	async listCommonFiles() {
		return this.repositories.files.list(this.commonUsername);
	}

	@Log(FileService.log, {level: "debug", arguments: []})
	async listFiles(username: string) {
		return this.repositories.files.list(username)
	}

	@Log(FileService.log, {level: "debug", arguments: [0]})
	async addCommonFile(filename: string, buffer: Buffer) {
		return this.addFile(this.commonUsername, filename, buffer)
	}

	@Log(FileService.log, {level: "debug", arguments: [0, 1]})
	async addFile(username: string, filename: string, buffer: Buffer) {
		await this.ensureUserExist(username);
		return (await this.repositories.files.add({
					name: filename,
					content: buffer.toString("base64"),
				},
				username)
		).id
	}

	@Log(FileService.log, {level: "debug", arguments: []})
	async deleteCommonFile(id: number) {
		return this.deleteFile(id, this.commonUsername);
	}

	@Log(FileService.log, {level: "debug", arguments: []})
	async deleteFile(id: number, username: string) {
		const file = await this.repositories.files.findById(id);
		if (!file) throw FileService.exceptions.fileNotFound
		if (file.user.username !== username) throw FileService.exceptions.notAuthorized
		await this.repositories.files.delete(id);
	}

	private async ensureUserExist(username: string) {
		if (await this.repositories.users.find(username) === undefined) {
			await this.repositories.users.create(username);
		}
	}
}
