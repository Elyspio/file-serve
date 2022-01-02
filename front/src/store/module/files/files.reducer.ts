import { createReducer } from "@reduxjs/toolkit";
import { getFiles, setVisualisationMode } from "./files.action";
import { FileModel } from "../../../core/apis/backend/generated";

export type FileOwner = "user" | "public";

export type VisualisationMode = "list" | "icons";

export interface ThemeState {
	public: FileModel[];
	user: FileModel[];
	visualisation: {
		user: VisualisationMode;
		public: VisualisationMode;
	};
}

const defaultState: ThemeState = {
	public: [],
	user: [],
	visualisation: {
		public: "list",
		user: "list",
	},
};

export const filesReducer = createReducer(defaultState, (builder) => {
	builder.addCase(getFiles.fulfilled, (state, action) => {
		state[action.payload.owner] = action.payload.data;
	});

	builder.addCase(setVisualisationMode, (state, action) => {
		state.visualisation[action.payload.owner] = action.payload.mode;
	});
});
