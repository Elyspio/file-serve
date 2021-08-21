import {Service} from "@tsed/common";
import {FileRepository} from "../database/repositories/file.repository";
import {UserRepository} from "../database/repositories/user.repository";
import {Log} from "../utils/decorators/logger";
import {getLogger} from "../utils/logger";

@Service()
export class FilesService {
	static exceptions = {
		fileNotFound: new Error("File not found")
	}
	private static log = getLogger.service(FilesService)
	private commonUsername = "common";

	private repositories: { files: FileRepository; users: UserRepository };

	constructor(fileRepository: FileRepository, userRepository: UserRepository) {
		this.repositories = {
			files: fileRepository,
			users: userRepository
		}
	}


	@Log(FilesService.log, {level: "debug", arguments: []})
	async getCommonFile(filename: string) {
		return this.getFileContent(this.commonUsername, filename);
	}

	@Log(FilesService.log, {level: "debug", arguments: []})
	async getFileContent(username: string, filename: string) {
		const file = await this.repositories.files.findById(username, filename);
		if (!file) throw FilesService.exceptions.fileNotFound
		return new Buffer(file.content, 'base64').toString("utf8")
	}

	@Log(FilesService.log, {level: "debug", arguments: []})
	async listCommonFiles() {
		return this.repositories.files.list(this.commonUsername);
	}

	@Log(FilesService.log, {level: "debug", arguments: []})
	async listFiles(username: string) {
		return this.repositories.files.list(username)
	}

	@Log(FilesService.log, {level: "debug", arguments: [0]})
	async addCommonFile(filename: string, buffer: Buffer) {
		return this.addFile(this.commonUsername, filename, buffer)
	}

	@Log(FilesService.log, {level: "debug", arguments: [0, 1]})
	async addFile(username: string, filename: string, buffer: Buffer) {
		await this.ensureUserExist(username);
		return (await this.repositories.files.add({
					name: filename,
					content: buffer.toString("base64"),
				},
				username)
		).id
	}

	private async ensureUserExist(username: string) {
		if (await this.repositories.users.find(username) === undefined) {
			await this.repositories.users.create(username);
		}
	}

}
