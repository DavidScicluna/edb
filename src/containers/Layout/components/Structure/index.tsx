import { FC, lazy } from 'react';

import { useIsFirstRender } from 'usehooks-ts';

import { Suspense } from '../../../../components';
import { useLayoutContext } from '../../common/hooks';

import DummyStructureDesktop from './components/DummyStructureDesktop';
import DummyStructureMobileTablet from './components/DummyStructureMobileTablet';
import { StructureProps } from './types';

const StructureMobileTablet = lazy(() => import('./components/StructureMobileTablet'));
const StructureDesktop = lazy(() => import('./components/StructureDesktop'));

const Structure: FC<StructureProps> = ({ children, ...rest }) => {
	const isFirstRender = useIsFirstRender();

	const { device } = useLayoutContext();

	if (!isFirstRender && device) {
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
	} else {
		return null;
	}
};

export default Structure;
