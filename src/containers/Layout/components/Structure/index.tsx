import { FC, lazy } from 'react';

import { Suspense } from '../../../../components';

import DummyStructureDesktop from './components/DummyStructureDesktop';
import DummyStructureMobileTablet from './components/DummyStructureMobileTablet';
import { StructureProps } from './types';

const StructureMobileTablet = lazy(() => import('./components/StructureMobileTablet'));
const StructureDesktop = lazy(() => import('./components/StructureDesktop'));

const Structure: FC<StructureProps> = ({ children, device, ...rest }) => {
	switch (device) {
		case 'desktop':
			return (
				<Suspense fallback={<DummyStructureDesktop>{children}</DummyStructureDesktop>}>
					<StructureDesktop {...rest}>{children}</StructureDesktop>
				</Suspense>
			);
		default:
			return (
				<Suspense
					fallback={<DummyStructureMobileTablet device={device}>{children}</DummyStructureMobileTablet>}
				>
					<StructureMobileTablet {...rest} device={device}>
						{children}
					</StructureMobileTablet>
				</Suspense>
			);
	}
};

export default Structure;
