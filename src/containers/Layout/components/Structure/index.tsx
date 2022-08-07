import { FC } from 'react';

import { StructureProps } from './types';
import StructureTablet from './components/StructureTablet';
import StructureMobile from './components/StructureMobile';
import StructureDesktop from './components/StructureDesktop';

const Structure: FC<StructureProps> = ({ device, isGuest }) => {
	switch (device) {
		case 'mobile':
			return <StructureMobile isGuest={isGuest} />;
		case 'tablet':
			return <StructureTablet isGuest={isGuest} />;
		default:
			return <StructureDesktop isGuest={isGuest} />;
	}
};

export default Structure;
