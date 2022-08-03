import { FC, useState } from 'react';

import { Outlet } from 'react-router';

import { useTheme } from '@davidscicluna/component-library';

import { HStack, Center, VStack } from '@chakra-ui/react';

import { useUpdateEffect } from 'usehooks-ts';
import { pick } from 'lodash';

import { useSelector } from '../../../../../../common/hooks';
import useStyle from '../../../../common/styles';
import ScrollToTop from '../../../ScrollToTop';
import { sidebar } from '../../../../common/data/sidebar';

import Sidebar from './components/Sidebar';

const StructureDesktop: FC = () => {
	const theme = useTheme();

	const sidebarMode = useSelector((state) => state.app.ui.sidebarMode);

	const [sidebarWidth, setSidebarWidth] = useState<number>(sidebar[sidebarMode]);

	const style = useStyle({ theme });

	useUpdateEffect(() => setSidebarWidth(sidebar[sidebarMode]), [sidebarMode]);

	return (
		<HStack width='100%' minHeight='100vh' position='relative' spacing={0} sx={{ ...style }}>
			<Center width={sidebarWidth} position='fixed' top={0} left={0} sx={{ ...style }}>
				<Sidebar />
			</Center>

			<VStack
				width={`calc(100% - ${sidebarWidth}px)`}
				minHeight='100vh'
				position='absolute'
				top={0}
				left={`${sidebarWidth}px`}
				alignItems='center'
				justifyContent='center'
				spacing={0}
				sx={{ ...pick(style, 'transitionDelay') }}
			>
				<Outlet />

				{/* <VStack width='100%' spacing={4} sx={{ ...style }}>
					<Box
						width='100%'
						minHeight={`calc(100vh - ${
							headerHeight + convertREMToPixels(convertStringToNumber(theme.space[4], 'rem'))
						}px)`}
						sx={{ ...style }}
					>
						<Outlet />
					</Box>

					{/* <Footer /> */}
				{/* </VStack> */}
			</VStack>

			<ScrollToTop />
		</HStack>
	);
};

export default StructureDesktop;
