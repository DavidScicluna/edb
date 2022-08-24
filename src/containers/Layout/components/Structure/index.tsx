import { FC } from 'react';

import { StructureProps } from './types';
import StructureTablet from './components/StructureTablet';
import StructureMobile from './components/StructureMobile';
import StructureDesktop from './components/StructureDesktop';

const Structure: FC<StructureProps> = ({ children, device, isGuest }) => {
	switch (device) {
		case 'mobile':
			return <StructureMobile isGuest={isGuest}>{children}</StructureMobile>;
		case 'tablet':
			return <StructureTablet isGuest={isGuest}>{children}</StructureTablet>;
		default:
			return <StructureDesktop isGuest={isGuest}>{children}</StructureDesktop>;
	}
};

export default Structure;
