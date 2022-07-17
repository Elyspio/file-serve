import { BackendApi } from "../apis/backend";
import { AuthenticationApi } from "../apis/authentication";
import { container } from "./index";

container.bind(BackendApi).toSelf();
container.bind(AuthenticationApi).toSelf();
