import {AfterRoutesInit, Service} from "@tsed/common";
import {TypeORMService} from "@tsed/typeorm";
import {Repository} from "typeorm"
import {FileEntity} from "../entities/file.entity";
import {getLogger} from "../../utils/logger";
import {Log} from "../../utils/decorators/logger";

@Service()
export class FileRepository implements AfterRoutesInit {
	private static log = getLogger.service(FileRepository);
	private repo: Repository<FileEntity>;

	constructor(private typeORMService: TypeORMService) {

	}

	$afterRoutesInit() {
		const connection = this.typeORMService.get("postgres")!; // get connection by name
		this.repo = connection.getRepository(FileEntity);
	}

	@Log(FileRepository.log, {level: "debug", arguments: false})
	async add(file: Omit<FileEntity, "id" | "user">, username: string): Promise<FileEntity> {
		return await this.repo.save({
			name: file.name,
			content: file.content,
			user: {
				username
			}
		});

	}

	@Log(FileRepository.log, {level: "debug", arguments: []})
	async find(username: string): Promise<FileEntity[]> {
		return await this.repo.find({
			where: {
				user: {
					username
				}
			}
		});
	}


	@Log(FileRepository.log, {level: "debug", arguments: []})
	async findById(id: number): Promise<FileEntity | undefined> {
		return await this.repo.findOne({
			where: {
				id
			},
			relations: ["user"]
		});
	}

	@Log(FileRepository.log, {level: "debug", arguments: []})
	async list(username: string) {
		return (await this.repo.find({
			select: ["name"],
			where: {
				user: {
					username
				}
			}
		})).map(file => ({name: file.name, id: file.id}))
	}

	@Log(FileRepository.log, {level: "debug", arguments: []})
	async delete(id: number) {
		await this.repo.delete({
			id,
		})
	}

	@Log(FileRepository.log, {level: "debug", arguments: []})
	async exist(id: number) {
		return (await this.findById(id)) !== undefined
	}

}
