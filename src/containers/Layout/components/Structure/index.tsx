import { FC, lazy } from 'react';

import { Suspense } from '../../../../components';

const DummyStructureMobileTablet = lazy(() => import('./components/StructureMobileTablet'));
const StructureDesktop = lazy(() => import('./components/StructureDesktop'));
import DummyStructureDesktop from './components/DummyStructureDesktop';
import DummyDummyStructureMobileTablet from './components/DummyStructureMobileTablet';
import { StructureProps } from './types';

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
					fallback={
						<DummyDummyStructureMobileTablet device={device}>{children}</DummyDummyStructureMobileTablet>
					}
				>
					<DummyStructureMobileTablet {...rest} device={device}>
						{children}
					</DummyStructureMobileTablet>
				</Suspense>
			);
	}
};

export default Structure;
