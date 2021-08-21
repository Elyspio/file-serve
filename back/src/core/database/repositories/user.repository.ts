import {AfterRoutesInit, Service} from "@tsed/common";
import {TypeORMService} from "@tsed/typeorm";
import {Repository} from "typeorm"
import {getLogger} from "../../utils/logger";
import {Log} from "../../utils/decorators/logger";
import {UserEntity} from "../entities/user.entity";

@Service()
export class UserRepository implements AfterRoutesInit {
	private static log = getLogger.service(UserRepository);
	private repo: Repository<UserEntity>;

	constructor(private typeORMService: TypeORMService) {

	}

	$afterRoutesInit() {
		const connection = this.typeORMService.get("postgres")!; // get connection by name
		this.repo = connection.getRepository(UserEntity);
	}

	@Log(UserRepository.log)
	async create(username: string): Promise<UserEntity> {
		return await this.repo.save({
			username
		});

	}

	@Log(UserRepository.log)
	async find(username: string) {
		return await this.repo.findOne({
			where: {
				username
			},
			relations: ["files"]
		});
	}

}
