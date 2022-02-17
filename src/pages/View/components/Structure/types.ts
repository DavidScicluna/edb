import { ReactElement } from 'react';

export type StructureProps = {
	children: {
		title: ReactElement;
		actions: ReactElement;
		tabList: ReactElement;
		socials?: ReactElement;
		tabPanels: ReactElement;
	};
};
