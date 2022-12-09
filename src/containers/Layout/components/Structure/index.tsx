import { FC, lazy } from 'react';

import { Suspense } from '../../../../components';
import { useLayoutContext } from '../../common/hooks';

import DummyStructureDesktop from './components/DummyStructureDesktop';
import DummyStructureMobileTablet from './components/DummyStructureMobileTablet';
import { StructureProps } from './types';

const StructureMobileTablet = lazy(() => import('./components/StructureMobileTablet'));
const StructureDesktop = lazy(() => import('./components/StructureDesktop'));

const Structure: FC<StructureProps> = ({ children, ...rest }) => {
	const { device } = useLayoutContext();

	switch (device) {
		case 'desktop':
			return (
				<Suspense fallback={<DummyStructureDesktop>{children}</DummyStructureDesktop>}>
					<StructureDesktop {...rest}>{children}</StructureDesktop>
				</Suspense>
			);
		case 'tablet':
			return (
				<Suspense
					fallback={<DummyStructureMobileTablet device='tablet'>{children}</DummyStructureMobileTablet>}
				>
					<StructureMobileTablet {...rest} device='tablet'>
						{children}
					</StructureMobileTablet>
				</Suspense>
			);
		default:
			return (
				<Suspense
					fallback={<DummyStructureMobileTablet device='mobile'>{children}</DummyStructureMobileTablet>}
				>
					<StructureMobileTablet {...rest} device='mobile'>
						{children}
					</StructureMobileTablet>
				</Suspense>
			);
	}
};

export default Structure;
