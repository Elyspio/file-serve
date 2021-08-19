import {Log} from "../utils/decorators/logger";
import {getLogger} from "../utils/logger";
import {AuthenticationApiClient} from "../apis/authentication/"
import {Inject} from "@tsed/di";
import {Service} from "@tsed/common";

@Service()
export class AuthenticationService {

	private static log = getLogger.service(AuthenticationService)

	@Inject()
	private authenticationApi: AuthenticationApiClient

	@Log(AuthenticationService.log)
	public async isAuthenticated(token: string) {
		const {data} = await this.authenticationApi.client.validToken(token);
		AuthenticationService.log.debug(`isAuthenticated token=${token} result=${data}`)
		return data;
	}
}
