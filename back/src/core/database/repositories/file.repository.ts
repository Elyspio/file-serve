import {AfterRoutesInit, Service} from "@tsed/common";
import {TypeORMService} from "@tsed/typeorm";
import {MongoRepository} from "typeorm"
import {UserEntity} from "../entities/user/user.entity";
import {getLogger} from "../../utils/logger";
import {Log} from "../../utils/decorators/logger";
import {File} from "../entities/user/file";
import {FileService} from "../../services/file.service";

@Service()
export class FileRepository implements AfterRoutesInit {
	private static log = getLogger.service(FileRepository);
	private repo: MongoRepository<UserEntity>;

	constructor(private typeORMService: TypeORMService) {

	}

	$afterRoutesInit() {
		const connection = this.typeORMService.get("postgres")!; // get connection by name
		this.repo = connection.getMongoRepository(UserEntity);
	}

	@Log(FileRepository.log, {level: "debug", arguments: false})
	async add(filename: string, data: Buffer, username: string, mime: string): Promise<File> {
		const user = await this.getUser(username)
		const id = `${username}-${user.files.length}`
		const index = user.files.push(new File(id, filename, data.toString("base64"), mime)) - 1
		await this.repo.save(user);
		return user.files[index];

	}

	@Log(FileRepository.log, {level: "debug", arguments: true})
	async find(username: string): Promise<File[]> {
		const user = await this.getUser(username)
		return user.files ?? [];
	}


	@Log(FileRepository.log, {level: "debug", arguments: true})
	async findById(username: string, id: string): Promise<File | undefined> {
		const user = (await this.repo.findOne({
				where: {
					username: {
						$eq: username
					},
					"files.id": {$eq: id}
				}
			}
		));
		return user?.files.find(file => file.id === id);
	}


	@Log(FileRepository.log, {level: "debug", arguments: true})
	async delete(username: string, id: string) {
		const user = (await this.repo.findOne({
				where: {
					"files.id": {$eq: id}
				}
			}
		));
		if (!user) throw FileService.exceptions.fileNotFound;


		user.files = user.files.filter(file => file.id !== id)

		await this.repo.update({
				id: user.id,
			},
			{
				files: user.files
			})

	}

	@Log(FileRepository.log, {level: "debug", arguments: true})
	async exist(username: string, id: string) {
		return (await this.findById(username, id)) !== undefined
	}


	private async getUser(username) {
		const user = await this.repo.findOne({
			where: {
				username: {
					$eq: username
				}
			}
		})
		if (!user) throw FileService.exceptions.fileNotFound;
		return user;
	}

}
