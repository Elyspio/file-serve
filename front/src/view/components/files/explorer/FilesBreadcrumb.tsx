import { Breadcrumbs, Link } from "@mui/material";
import React, { ReactNode } from "react";
import { FilesExplorerService, NodeElem } from "../../../../core/services/files.explorer.service";
import { useInjection } from "inversify-react";
import { DiKeysService } from "../../../../core/di/di.keys.service";

interface FileBreadcrumbProps {
	root: NodeElem;
	current: NodeElem;
	setCurrent: (node: NodeElem) => void;
}

export function FilesBreadcrumb({ setCurrent, current, root }: FileBreadcrumbProps) {
	const services = {
		explorer: useInjection<FilesExplorerService>(DiKeysService.filesExplorer),
	};

	const parents = React.useMemo(() => services.explorer.getNodeParents(root, current.id), [root, current.id, services.explorer]);

	const components: ReactNode[] = React.useMemo(
		() =>
			[...parents, current].map((item) => {
				const text = item.path !== "/" ? item.path : "root";
				const isLast = item.id === current.id;
				return (
					<Link underline={"none"} key={item.id} sx={{ cursor: isLast ? "inherit" : "pointer" }} color={isLast ? "primary" : "inherit"} onClick={() => setCurrent(item)}>
						{text}
					</Link>
				);
			}),
		[parents, current, setCurrent]
	);

	return (
		<Breadcrumbs separator="/" aria-label="breadcrumb">
			{components}
		</Breadcrumbs>
	);
}
