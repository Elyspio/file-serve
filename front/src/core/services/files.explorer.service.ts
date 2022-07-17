import { injectable } from "inversify";
import { FileData } from "../apis/backend/generated";

interface NodeShared {
	id: number;
	path: string;
	hidden: boolean;
}

interface NodeFile extends NodeShared {
	type: "file";
	data: FileData;
}

export interface NodeFolder extends NodeShared {
	type: "folder";
	nodes: NodeElem[];
}

export type NodeElem = (NodeFolder | NodeFile) & {
	parent?: NodeFolder;
};

let currentId = 1;

@injectable()
export class FilesExplorerService {
	public convert(files: FileData[]) {
		const ret: NodeElem = {
			nodes: [],
			path: "/",
			type: "folder",
			id: 0,
			hidden: false,
		};

		for (const file of files) {
			this.addLeaf(ret, file);
		}

		this.setHiddenFolder(ret);

		return ret;
	}

	public getNodeParents(root: NodeElem, id: NodeElem["id"]) {
		if (root.type !== "folder") throw new Error("Root must be a NodeFolder");
		const nodes = this.findNodes(root).filter((node) => node !== false) as NodeElem[];
		let node = nodes.find((node) => node.id === id);
		if (!node) throw new Error(`Could not find the node ${id} in root with id ${root.id}`);
		let parents: NodeElem[] = [];
		while (node.parent) {
			parents.push(node.parent);
			node = node.parent;
		}
		return parents.reverse();
	}

	private findNodes(root: NodeElem): (NodeElem | false)[] {
		if (root.type === "folder") {
			return [root, ...root.nodes.map((node) => this.findNodes(node)).flat()];
		} else {
			return [root];
		}
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
					parent: current,
					hidden: false,
				});
			}
			current = current.nodes!.find((item) => item.path === p)! as NodeFolder;
		}
	}

	private addLeaf(root: NodeElem, leaf: FileData) {
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
			parent: current,
			hidden: leaf.hidden,
		});
	}

	private setHiddenFolder(root: NodeFolder) {
		root.nodes
			.filter((node) => node.type === "folder")
			.forEach((node) => {
				this.setHiddenFolder(node as NodeFolder);
			});
		root.hidden = root.nodes.every((node) => node.hidden);
	}
}
