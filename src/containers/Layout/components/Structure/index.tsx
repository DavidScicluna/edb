import { FC } from 'react';

import { StructureProps } from './types';
import StructureTablet from './components/StructureTablet';
import StructureMobile from './components/StructureMobile';
import StructureDesktop from './components/StructureDesktop';

const Structure: FC<StructureProps> = ({ type }) => {
	switch (type) {
		case 'mobile':
			return <StructureMobile />;
		case 'tablet':
			return <StructureTablet />;
		default:
			return <StructureDesktop />;
	}
};

export default Structure;
