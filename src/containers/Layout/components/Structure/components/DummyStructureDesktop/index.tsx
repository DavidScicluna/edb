import { FC, useContext, useState } from 'react';

import { useTheme } from '@davidscicluna/component-library';

import { HStack, Center, VStack } from '@chakra-ui/react';

import { useUpdateEffect } from 'usehooks-ts';

import { isAuthenticationRoute as defaultIsAuthenticationRoute } from '../../../../common/data/defaultPropValues';
import { StructureCommonProps as DummyStructureDesktopProps } from '../../common/types';
import { useSelector } from '../../../../../../common/hooks';
import { sidebar } from '../../../../common/data/sidebar';
import { LayoutContext } from '../../../..';
import { LayoutContext as LayoutContextType } from '../../../../types';
import DummyFooter from '../Footer';

import DummySidebar from './components/DummySidebar';

const DummyStructureDesktop: FC<DummyStructureDesktopProps> = ({ children }) => {
	const theme = useTheme();

	const { isAuthenticationRoute = defaultIsAuthenticationRoute } = useContext<LayoutContextType>(LayoutContext);

	const sidebarMode = useSelector((state) => state.app.ui.sidebarMode);

	const [sidebarWidth, setSidebarWidth] = useState<number>(sidebar[sidebarMode]);

	useUpdateEffect(() => setSidebarWidth(sidebar[sidebarMode]), [sidebarMode]);

	return (
		<HStack width='100%' minHeight='100vh' position='relative' spacing={0}>
			{!isAuthenticationRoute && (
				<Center width={`${sidebarWidth}px`} position='fixed' top={0} zIndex={theme.zIndices.sticky}>
					<DummySidebar />
				</Center>
			)}

			<VStack
				width={!isAuthenticationRoute ? `calc(100% - ${sidebarWidth}px)` : '100%'}
				height='100%'
				minHeight='100vh'
				position='relative'
				top={0}
				left={!isAuthenticationRoute ? `${sidebarWidth}px` : 0}
				alignItems='stretch'
				justifyContent='stretch'
				spacing={4}
			>
				<Center width='100%' height='100%' minHeight='inherit' alignItems='stretch' justifyContent='stretch'>
					{children}
				</Center>

				{!isAuthenticationRoute && <DummyFooter isDummy />}
			</VStack>
		</HStack>
	);
};

export default DummyStructureDesktop;
