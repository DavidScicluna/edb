import { ReactElement } from 'react';

export type ToolkitProps = {
	renderActions: () => ReactElement;
	renderNavigation: () => ReactElement;
	onHover: (bool: boolean) => void;
};
