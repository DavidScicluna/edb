import { FC, useState, useEffect } from 'react';

import { useTheme, Fade, utils } from '@davidscicluna/component-library';

import { useBoolean, useConst, HStack, Center, VStack } from '@chakra-ui/react';

import { useUpdateEffect } from 'usehooks-ts';
import { Transition } from 'framer-motion';

import { isGuest as defaultIsGuest } from '../../common/data/defaultPropValues';
import { StructureCommonProps as StructureDesktopProps } from '../../common/types';
import { useSelector } from '../../../../../../common/hooks';
import useStyle from '../../../../common/styles';
import { sidebar } from '../../../../common/data/sidebar';

import Sidebar from './components/Sidebar';

const { getTransitionDuration } = utils;

const authPaths = ['/signin', '/register', '/forgot-password'];

const StructureDesktop: FC<StructureDesktopProps> = ({ children, isGuest = defaultIsGuest }) => {
	const theme = useTheme();

	const sidebarMode = useSelector((state) => state.app.ui.sidebarMode);

	const [sidebarWidth, setSidebarWidth] = useState<number>(sidebar[sidebarMode]);

	const [isAuthentication, setisAuthentication] = useBoolean();

	const duration = useConst<number>(getTransitionDuration({ theme, duration: 'slow' }));

	const config = useConst<Transition>({ duration });

	const style = useStyle({ theme });

	useUpdateEffect(() => setSidebarWidth(sidebar[sidebarMode]), [sidebarMode]);

	useEffect(() => setisAuthentication[authPaths.includes(location.pathname) ? 'on' : 'off'](), [location.pathname]);

	return (
		<HStack width='100%' minHeight='100vh' position='relative' spacing={0} sx={{ ...style }}>
			<Fade
				in={!isAuthentication}
				style={{ width: sidebarWidth, position: 'fixed', left: 0 }}
				transition={{ enter: { ...config }, exit: { ...config } }}
			>
				<Center width={sidebarWidth} sx={{ ...style }}>
					<Sidebar isGuest={isGuest} />
				</Center>
			</Fade>

			<VStack
				width={`calc(100% - ${sidebarWidth}px)`}
				minHeight='100vh'
				position='absolute'
				top={0}
				left={`${sidebarWidth}px`}
				alignItems='center'
				justifyContent='center'
				spacing={0}
				sx={{ ...style }}
			>
				{children}

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
		</HStack>
	);
};

export default StructureDesktop;
