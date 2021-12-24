import { AfterRoutesInit, Service } from "@tsed/common";
import { TypeORMService } from "@tsed/typeorm";
import { MongoRepository } from "typeorm";
import { getLogger } from "../../utils/logger";
import { Log } from "../../utils/decorators/logger";
import { UserEntity } from "../entities/user/user.entity";

@Service()
export class UserRepository implements AfterRoutesInit {
	private static log = getLogger.service(UserRepository);
	private repo: MongoRepository<UserEntity>;

	constructor(private typeORMService: TypeORMService) {}

	$afterRoutesInit() {
		const connection = this.typeORMService.get("db")!; // get connection by name
		this.repo = connection.getMongoRepository(UserEntity);
	}

	@Log(UserRepository.log, { level: "debug", arguments: true })
	async create(username: string): Promise<UserEntity> {
		return await this.repo.save({
			username,
			files: [],
		});
	}

	@Log(UserRepository.log, { level: "debug", arguments: true })
	async find(username: string) {
		return await this.repo.findOne({
			where: {
				username: { $eq: username },
			},
		});
	}
}
