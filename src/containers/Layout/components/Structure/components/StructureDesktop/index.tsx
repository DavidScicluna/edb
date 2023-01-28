import { FC, useState, useEffect } from 'react';

import { useTheme, Fade, utils } from '@davidscicluna/component-library';

import { useBoolean, useConst, HStack, Center, VStack } from '@chakra-ui/react';

import { useUpdateEffect } from 'usehooks-ts';
import { Transition } from 'framer-motion';

import { StructureCommonProps as StructureDesktopProps } from '../../common/types';
import { useSelector } from '../../../../../../common/hooks';
import useStyle from '../../../../common/styles';
import { sidebar } from '../../../../common/data/sidebar';
import Footer from '../Footer';
import { useLayoutContext } from '../../../../common/hooks';
import RecentlyViewed from '../RecentlyViewed';

import Sidebar from './components/Sidebar';

const { getTransitionConfig, getTransitionDuration } = utils;

const StructureDesktop: FC<StructureDesktopProps> = ({ children }) => {
	const theme = useTheme();

	const { isAuthenticationRoute, isGuest } = useLayoutContext();

	const sidebarMode = useSelector((state) => state.app.ui.sidebarMode);

	const [sidebarWidth, setSidebarWidth] = useState<number>(sidebar[sidebarMode]);

	const [isPositionDelayed, setIsPositionDelayed] = useBoolean();

	const duration = useConst<number>(getTransitionDuration({ theme, duration: 'slow' }));
	const config = useConst<Transition>({ ...getTransitionConfig({ theme }), duration });

	const style = useStyle({ theme });

	useUpdateEffect(() => setSidebarWidth(sidebar[sidebarMode]), [sidebarMode]);

	useEffect(() => {
		setTimeout(() => setIsPositionDelayed[isAuthenticationRoute ? 'on' : 'off'](), 500);
	}, [isAuthenticationRoute]);

	return (
		<HStack width='100%' minHeight='100vh' position='relative' spacing={0} sx={{ ...style }}>
			<Fade
				in={!isAuthenticationRoute}
				style={{ width: `${sidebarWidth}px`, position: 'fixed', top: 0, zIndex: theme.zIndices.sticky }}
				transition={{ enter: { ...config }, exit: { ...config } }}
			>
				<Center width={`${sidebarWidth}px`} sx={{ ...style }}>
					<Sidebar />
				</Center>
			</Fade>

			<VStack
				width={!isAuthenticationRoute ? `calc(100% - ${sidebarWidth}px)` : '100%'}
				height='100%'
				minHeight='100vh'
				position='relative'
				top={0}
				left={!isAuthenticationRoute ? `${sidebarWidth}px` : 0}
				alignItems='stretch'
				justifyContent='stretch'
				spacing={0}
				sx={!isPositionDelayed ? { ...style } : {}}
			>
				<Center width='100%' height='100%' minHeight='inherit' alignItems='stretch' justifyContent='stretch'>
					{children}
				</Center>

				{!isGuest && (
					<Fade
						in={!isAuthenticationRoute}
						transition={{ enter: { ...config }, exit: { ...config } }}
						style={{ width: '100%' }}
					>
						<RecentlyViewed />
					</Fade>
				)}

				<Fade
					in={!isAuthenticationRoute}
					transition={{ enter: { ...config }, exit: { ...config } }}
					style={{ width: '100%' }}
				>
					<Footer />
				</Fade>
			</VStack>
		</HStack>
	);
};

export default StructureDesktop;
