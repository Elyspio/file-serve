import { useCallback, useEffect, useState } from "react";

type UseAsyncStateFuncParams<T> = () => Promise<T>;

export function useAsyncState<T>(func: UseAsyncStateFuncParams<T>, defaultValue: T, replay?: number) {
	const [data, setData] = useState<T>(defaultValue);
	const [state, setState] = useState<"pending" | "success" | "error">("pending");
	const handle = useCallback(async (func: UseAsyncStateFuncParams<T>) => {
		setState("pending");
		try {
			const out = await func();
			setState("success");
			setData(out);
		} catch (e) {
			setState("error");
		}
	}, []);

	useEffect(() => {
		handle(func);
		let timer: NodeJS.Timer | undefined;
		if (replay) {
			timer = setInterval(() => {
				handle(func);
			}, replay);
		}

		return () => {
			timer && clearInterval(timer);
		};
	}, [func, replay, handle]);

	const reload = useCallback(() => handle(func), [handle, func]);

	return {
		data,
		state,
		reload,
	};
}
