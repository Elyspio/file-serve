import React, { useCallback } from "react";
import { SelectChangeEvent } from "@mui/material";

type Mode = "value" | "checked";

/**
 * Wrap an HTML input change event to a React SetState function
 * @param setter
 * @param mode
 */
export function useInput<T>(setter: React.Dispatch<React.SetStateAction<T>>, mode: Mode = "value") {
	return useCallback(
		({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<any>) => {
			if (mode === "value") setter(target.value as unknown as T);
			if (mode === "checked" && "checked" in target) setter(target.checked as unknown as T);
		},
		[setter, mode]
	);
}
