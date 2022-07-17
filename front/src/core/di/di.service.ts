import { FilesService } from "../services/files.service";
import { AuthenticationService } from "../services/authentication.service";
import { ThemeService } from "../services/theme.service";
import { LocalStorageService } from "../services/localStorage.service";
import { DiKeysService } from "./di.keys.service";
import { container } from "./index";
import { FilesExplorerService } from "../services/files.explorer.service";

container.bind<LocalStorageService>(DiKeysService.localStorage.settings).toConstantValue(new LocalStorageService("elyspio-authentication-settings"));

container.bind<LocalStorageService>(DiKeysService.localStorage.validation).toConstantValue(new LocalStorageService("elyspio-authentication-validation"));

container.bind(AuthenticationService).toSelf();
container.bind(FilesService).toSelf();
container.bind(FilesExplorerService).toSelf();
container.bind(ThemeService).toSelf();
