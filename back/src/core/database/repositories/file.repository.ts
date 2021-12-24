import { AfterRoutesInit, Service } from "@tsed/common";
import { TypeORMService } from "@tsed/typeorm";
import { MongoRepository } from "typeorm";
import { UserEntity } from "../entities/user/user.entity";
import { getLogger } from "../../utils/logger";
import { Log } from "../../utils/decorators/logger";
import { File } from "../entities/user/file";
import { FileService } from "../../services/file.service";
import { randomBytes } from "crypto";
import { GridFSPromise } from "gridfs-promise";
import { StorageService } from "../../services/storage.service";
import { Inject } from "@tsed/di";
import { Helper } from "../../utils/helper";

// gridFS
// 	.getObject("59e085f272882d728e2fa4c2")
// 	.then((item) => {
// 		console.log(item);
// 	})
// 	.catch((err) => {
// 		console.error(err);
// 	});

@Service()
export class FileRepository implements AfterRoutesInit {
	private static log = getLogger.service(FileRepository);
	private repo: MongoRepository<UserEntity>;

	@Inject()
	private storageService: StorageService;
	private gridFS: GridFSPromise;

	constructor(private typeORMService: TypeORMService) {}

	$afterRoutesInit() {
		const connection = this.typeORMService.get("db")!; // get connection by name

		this.repo = connection.getMongoRepository(UserEntity);

		// init grid FS
		this.gridFS = new GridFSPromise("admin");
		this.gridFS.CONNECTION = (connection.driver as any).queryRunner.databaseConnection;
	}

	@Log(FileRepository.log, { level: "debug", arguments: false })
	async add(filename: string, data: Buffer, username: string, mime: string): Promise<File> {
		const user = await this.getUser(username);
		const id = randomBytes(8).toString("hex");

		// store data to grid fs
		const { filepath, clean: cleanTempFile } = await this.storageService.createTempFile(data);
		const gridFsFile = await this.gridFS.uploadFile(filepath, `${username}-${filename}`, mime, { username, filename }, false);
		await cleanTempFile();

		const index = user.files.push(new File(id, filename, mime, gridFsFile._id.toString())) - 1;
		await this.repo.save(user);

		return user.files[index];
	}

	@Log(FileRepository.log, { level: "debug", arguments: true })
	async find(username: string): Promise<File[]> {
		const user = await this.getUser(username);
		return user.files ?? [];
	}

	@Log(FileRepository.log, { level: "debug", arguments: true })
	async findById(username: string, id: string): Promise<File | undefined> {
		const user = await this.repo.findOne({
			where: {
				username: {
					$eq: username,
				},
				"files.id": { $eq: id },
			},
		});
		return user?.files.find((file) => file.id === id);
	}

	async findByIdWithContent(username: string, id: string) {
		const file = await this.findById(username, id);
		if (!file) throw FileService.exceptions.fileNotFound;

		const stream = await this.gridFS.getFileStream(file.gridId);
		return { buffer: await Helper.stream2buffer(stream), file };
	}

	@Log(FileRepository.log, { level: "debug", arguments: true })
	async delete(username: string, id: string) {
		const user = await this.repo.findOne({
			where: {
				"files.id": { $eq: id },
			},
		});

		if (!user) throw FileService.exceptions.fileNotFound;
		const file = user.files.find((file) => file.id === id)!;

		user.files = user.files.filter((file) => file.id !== id);

		const updateDb = this.repo.update(
			{
				id: user.id,
			},
			{
				files: user.files,
			}
		);

		const updateGridFs = this.gridFS.delete(file.gridId);

		await Promise.all([updateDb, updateGridFs]);
	}

	@Log(FileRepository.log, { level: "debug", arguments: true })
	async exist(username: string, id: string) {
		return (await this.findById(username, id)) !== undefined;
	}

	private async getUser(username) {
		const user = await this.repo.findOne({
			where: {
				username: {
					$eq: username,
				},
			},
		});
		if (!user) throw FileService.exceptions.fileNotFound;
		return user;
	}
}
