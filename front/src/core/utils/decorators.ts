import {toast} from "react-toastify";
import {getArgsStr} from "./functions";

type ToastOnTypes = "error" | "success" | "pending"

type ToastOnParam = { [key in ToastOnTypes]?: string }


export function ToastOn(on: ToastOnParam, config?: { concatArgs?: boolean | string[], }) {
	return function (target: any, prop: string, descriptor?: PropertyDescriptor) {
		console.log(`decorated at ${on} ${prop} ${descriptor}`);

		if (descriptor?.value) {
			const originalMethod = descriptor.value;


			// Redefine the method value with our own
			descriptor.value = function (...args) {
				// Execute the method with its initial context and arguments
				// Return value is stored into a variable instead of being passed to the execution stack
				function handleError(err: Error) {
					if (on.error) {
						let msg = `${on.error}`
						if (config?.concatArgs) {
							msg += ` ${getArgsStr(originalMethod, args)}`;
						}
						if (process.env.NODE_ENV === "development") msg += `: ${prop} - ${err.name}: ${err.message}`
						toast.error(msg, {autoClose: 7000})
						console.error(msg, err)
					}
				}

				function handleSuccess() {
					if (on.success) {
						let msg = `${on.success}`
						if (config?.concatArgs) {
							msg += getArgsStr(originalMethod, args);
						}
						if (process.env.NODE_ENV === "development") msg += `: ${prop}`
						toast.success(msg)
					}
				}

				try {
					let result = originalMethod.apply(this, args);

					if (typeof result === "object" && typeof result.then === "function") {
						const promise = result.then((ret) => {
							handleSuccess()
							return ret;
						});
						if (typeof promise.catch === "function") {
							promise.catch((e: Error) => {
								handleError(e)
								return e
							});
						}
					} else {
						handleSuccess()
					}
					return result;
				} catch (e) {
					handleError(e);
				}


				// Return back the value to the execution stack
			};

		}


		// Return the descriptorwith the altered value
		return descriptor;

	}
}
