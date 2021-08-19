import {Apis} from "../apis";
import {injectable} from "inversify";

@injectable()
export class ExampleService {
	getContent() {
		return Apis.core.example.get()
	}

	async getAdminContent() {
		return Apis.core.example.getAdmin().then(x => x.data);
	}
}
