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


	@Log(FileService.log, {level: "debug", arguments: true})
	async getCommonFile(id: string) {
		return this.getFileContent(id);
	}

	@Log(FileService.log, {level: "debug", arguments: true})
	async getFileContent(id: string) {
		const file = await this.repositories.files.findById(id);
		if (!file) throw FileService.exceptions.fileNotFound
		return new Buffer(file.content, 'base64').toString("utf8")
	}

	@Log(FileService.log, {level: "debug", arguments: true})
	async listCommonFiles() {
		return this.listFiles(this.commonUsername);
	}

	@Log(FileService.log, {level: "debug", arguments: true})
	async listFiles(username: string) {
		return (await this.repositories.files.find(username))
			.map(file => ({name: file.name, id: file.id}));
	}

	@Log(FileService.log, {level: "debug", arguments: [0]})
	async addCommonFile(filename: string, buffer: Buffer) {
		return this.addFile(this.commonUsername, filename, buffer)
	}

	@Log(FileService.log, {level: "debug", arguments: [0, 1]})
	async addFile(username: string, filename: string, buffer: Buffer) {
		await this.ensureUserExist(username);
		return (await this.repositories.files.add(filename, buffer, username)).id
	}

	@Log(FileService.log, {level: "debug", arguments: true})
	async deleteCommonFile(id: string) {
		return this.deleteFile(id);
	}

	@Log(FileService.log, {level: "debug", arguments: true})
	async deleteFile(id: string) {
		await this.repositories.files.delete(id);
	}

	private async ensureUserExist(username: string) {
		if (await this.repositories.users.find(username) === undefined) {
			await this.repositories.users.create(username);
		}
	}
}
