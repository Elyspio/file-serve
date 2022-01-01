import React from "react";
import { FileModel } from "../../../../core/apis/backend/generated";
import { useInjection } from "inversify-react";
import { FilesExplorerService, NodeElem, NodeFolder } from "../../../../core/services/files.explorer.service";
import { DiKeysService } from "../../../../core/di/di.keys.service";
import { Grid, IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { NodeExplorer } from "./NodeExplorer";
import { FilesBreadcrumb } from "./FilesBreadcrumb";

interface FileExplorerProps {
	files: FileModel[];
	owner: "public" | "user";
}

export function FilesExplorer({ files, owner }: FileExplorerProps) {
	const services = {
		explorer: useInjection<FilesExplorerService>(DiKeysService.filesExplorer),
	};

	let root = React.useMemo(() => services.explorer.convert(files), [services.explorer, files]);
	const [current, setCurrent] = React.useState<NodeElem>(root);

	React.useEffect(() => {
		setCurrent(root);
	}, [root]);

	const goBack = React.useCallback(() => {
		if (current.parent) setCurrent(current.parent);
	}, [current.parent]);

	const goIn = React.useCallback((node: NodeElem) => {
		setCurrent(node);
	}, []);

	if (files.length === 0) return null;

	return (
		<Grid className={"FilesExplorer"} container direction={"column"} p={1}>
			<Grid item p={1} bgcolor={"background.default"}>
				<FilesBreadcrumb root={root} setCurrent={goIn} current={current} />
			</Grid>

			<Grid container item spacing={2} alignItems={"center"} my={1}>
				{current.id !== root.id && (
					<Grid item>
						<IconButton onClick={goBack}>
							<ArrowBack />
						</IconButton>
					</Grid>
				)}

				{(current as NodeFolder).nodes.map((node) => (
					<Grid item key={node.id}>
						<NodeExplorer owner={owner} node={node} setCurrent={goIn} />
					</Grid>
				))}
			</Grid>
		</Grid>
	);
}
