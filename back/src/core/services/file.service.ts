import { Service } from "@tsed/common";
import { FileRepository } from "../database/repositories/file.repository";
import { UserRepository } from "../database/repositories/user.repository";
import { Log } from "../utils/decorators/logger";
import { getLogger } from "../utils/logger";
import { Readable } from "stream";

@Service()
export class FileService {
	static exceptions = {
		fileNotFound: new Error("File not found"),
		notAuthorized: new Error("This is not your file !!l"),
	};
	private static log = getLogger.service(FileService);
	private commonUsername = "common";

	private repositories: { files: FileRepository; users: UserRepository };

	constructor(fileRepository: FileRepository, userRepository: UserRepository) {
		this.repositories = {
			files: fileRepository,
			users: userRepository,
		};
	}

	// region get

	@Log(FileService.log, { level: "debug", arguments: true })
	async getCommonFile(id: string) {
		return this.getFile(this.commonUsername, id);
	}

	@Log(FileService.log, { level: "debug", arguments: true })
	async getCommonStream(id: string) {
		return this.getFileStream(this.commonUsername, id);
	}

	/**
	 * Get a file with its content
	 * @param username user's name
	 * @param id file's id
	 */
	@Log(FileService.log, { level: "debug", arguments: true })
	async getFile(username: string, id: string) {
		return await this.repositories.files.findByIdWithContent(username, id);
	}

	@Log(FileService.log, { level: "debug", arguments: true })
	async getCommonFileContent(id: string) {
		return this.getFileContent(this.commonUsername, id);
	}

	/**
	 * Get file's content
	 * @param username user's name
	 * @param id file's id
	 */
	@Log(FileService.log, { level: "debug", arguments: true })
	async getFileContent(username: string, id: string) {
		const { buffer } = await this.repositories.files.findByIdWithContent(username, id);
		return buffer;
	}

	@Log(FileService.log, { level: "debug", arguments: true })
	async getFileStream(username: string, id: string) {
		const { file, buffer } = await this.repositories.files.findByIdWithContent(username, id);
		return {
			stream: Readable.from(buffer),
			length: buffer.length,
			mime: file.mime,
		};
	}

	// endregion get

	// region list

	/**
	 * List public files
	 */
	@Log(FileService.log, { level: "debug", arguments: true })
	async listCommonFiles() {
		return this.listFiles(this.commonUsername);
	}

	/**
	 * List user's files
	 * @param username user's name
	 */
	@Log(FileService.log, { level: "debug", arguments: true })
	async listFiles(username: string) {
		await this.ensureUserExist(username);
		return (await this.repositories.files.find(username)).map((file) => ({
			name: file.name,
			id: file.id,
			mime: file.mime,
		}));
	}

	// endregion list

	// region add

	@Log(FileService.log, { level: "debug", arguments: [0, 2] })
	async addCommonFile(filename: string, buffer: Buffer, mime: string) {
		return this.addFile(this.commonUsername, filename, buffer, mime);
	}

	@Log(FileService.log, { level: "debug", arguments: [0, 2] })
	async addCommonFileFromBytes(filename: string, bytes: number[], mime: string) {
		return this.addFileFromBytes(this.commonUsername, filename, bytes, mime);
	}

	@Log(FileService.log, { level: "debug", arguments: [0, 1, 3] })
	async addFile(username: string, filename: string, buffer: Buffer, mime: string) {
		await this.ensureUserExist(username);
		return (await this.repositories.files.add(filename, buffer, username, mime)).id;
	}

	@Log(FileService.log, { level: "debug", arguments: [0, 1, 3] })
	async addFileFromBytes(username: string, filename: string, bytes: number[], mime: string) {
		return this.addFile(username, filename, Buffer.from(bytes), mime);
	}

	// endregion add

	// region delete

	@Log(FileService.log, { level: "debug", arguments: true })
	async deleteCommonFile(id: string) {
		return this.deleteFile(this.commonUsername, id);
	}

	@Log(FileService.log, { level: "debug", arguments: true })
	async deleteFile(username: string, id: string) {
		await this.repositories.files.delete(username, id);
	}

	// endregion delete

	private async ensureUserExist(username: string) {
		if ((await this.repositories.users.find(username)) === undefined) {
			await this.repositories.users.create(username);
		}
	}
}
