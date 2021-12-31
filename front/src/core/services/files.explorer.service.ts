import { injectable } from "inversify";
import { FileModel } from "../apis/backend/generated";

interface NodeFile {
	type: "file";
	data: FileModel;
}

export interface NodeFolder {
	type: "folder";
	nodes: NodeElem[];
}

export type NodeElem = (NodeFolder | NodeFile) & {
	id: number;
	path: string;
};

let currentId = 1;

@injectable()
export class FilesExplorerService {
	public convert(files: FileModel[]) {
		const ret: NodeElem = {
			nodes: [],
			path: "/",
			type: "folder",
			id: 0,
		};

		for (const file of files) {
			this.addLeaf(ret, file);
		}

		return ret;
	}

	private createBranches(root: NodeElem, path: string) {
		const split = path.split("/").filter((x) => x.length);
		let current = root as NodeFolder;
		for (const p of split) {
			if (!current.nodes!.find((item) => item.path === p)) {
				current.nodes!.push({
					path: p,
					type: "folder",
					nodes: [],
					id: currentId++,
				});
			}
			current = current.nodes!.find((item) => item.path === p)! as NodeFolder;
		}
	}

	private addLeaf(root: NodeElem, leaf: FileModel) {
		// navigate to leaf folder
		this.createBranches(root, leaf.location);
		const split = leaf.location.split("/").filter((x) => x.length);
		let current = root as NodeFolder;
		for (const p of split) {
			current = current.nodes!.find((item) => item.path === p)! as NodeFolder;
		}
		// add leaf
		current.nodes!.push({
			path: leaf.filename,
			type: "file",
			data: leaf,
			id: currentId++,
		});
	}
}
