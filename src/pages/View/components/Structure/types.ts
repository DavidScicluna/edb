import { ReactElement } from 'react';

export type StructureProps = {
	children: {
		tabList: ReactElement;
		socials?: ReactElement;
		tabPanels: ReactElement;
	};
};
