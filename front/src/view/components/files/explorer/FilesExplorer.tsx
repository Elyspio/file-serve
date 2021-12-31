import React from "react";
import { FileModel } from "../../../../core/apis/backend/generated";
import { useInjection } from "inversify-react";
import { FilesExplorerService, NodeElem, NodeFolder } from "../../../../core/services/files.explorer.service";
import { DiKeysService } from "../../../../core/di/di.keys.service";
import { Grid, IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { usePrevious } from "../../../hooks/usePrevious";
import { NodeExplorer } from "./NodeExplorer";

interface FileExplorerProps {
	files: FileModel[];
	owner: "public" | "user";
}

export function FilesExplorer({ files, owner }: FileExplorerProps) {
	const services = {
		explorer: useInjection<FilesExplorerService>(DiKeysService.filesExplorer),
	};

	let root = services.explorer.convert(files);
	const [current, setCurrent] = React.useState<NodeElem>(root);
	const previous = usePrevious(current);
	React.useEffect(() => {
		setCurrent(services.explorer.convert(files));
	}, [services.explorer, files]);

	const goBack = React.useCallback(() => {
		if (previous) setCurrent(previous);
	}, [previous]);

	const goIn = React.useCallback((node: NodeElem) => {
		setCurrent(node);
	}, []);

	return (
		<Grid className={"FilesExplorer"} container spacing={2} alignItems={"center"} p={1}>
			{
				// TODO JGD add https://mui.com/components/breadcrumbs/
			}

			{current.id !== root.id && (
				<Grid item>
					<IconButton onClick={goBack}>
						<ArrowBack />
					</IconButton>
				</Grid>
			)}

			{(current as NodeFolder).nodes.map((node) => (
				<Grid item>
					<NodeExplorer owner={owner} node={node} setCurrent={goIn} />
				</Grid>
			))}
		</Grid>
	);
}
