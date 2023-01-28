import { FC } from 'react';

import { useLocation } from 'react-router';

import {
	useTheme,
	InternalLink,
	Button,
	IconButton,
	IconButtonIcon,
	Fade,
	utils
} from '@davidscicluna/component-library';

import { useDisclosure, useConst, VStack, HStack, Center } from '@chakra-ui/react';

import { useElementSize, useUpdateEffect } from 'usehooks-ts';
import { Transition } from 'framer-motion';

import { useUserTheme } from '../../../../../../common/hooks';
import Gradient from '../Gradient';
import Footer from '../Footer';
import { useLayoutContext } from '../../../../common/hooks';
import RecentlyViewed from '../RecentlyViewed';

import Sidebar from './components/Sidebar';
import User from './components/User';
import Internationalization from './components/Internationalization';
import { StructureMobileTabletProps } from './types';

const { getTransitionConfig, getTransitionDuration, getColor } = utils;

const StructureMobileTablet: FC<StructureMobileTabletProps> = ({ children, device }) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const { isGuest, isAuthenticationRoute } = useLayoutContext();

	const location = useLocation();

	const { isOpen: isSidebarOpen, onOpen: onSidebarOpen, onClose: onSidebarClose } = useDisclosure();

	const [headerRef, { height: headerHeight }] = useElementSize();

	const duration = useConst<number>(getTransitionDuration({ theme, duration: 'slow' }));
	const config = useConst<Transition>({ ...getTransitionConfig({ theme }), duration });

	useUpdateEffect(() => onSidebarClose(), [location.pathname]);

	return (
		<>
			<VStack width='100%' minHeight='100vh' position='relative' spacing={0}>
				<Fade
					in={!isAuthenticationRoute}
					transition={{ enter: { ...config }, exit: { ...config } }}
					style={{ width: '100%', position: 'fixed', top: 0, zIndex: 1 }}
				>
					<HStack
						ref={headerRef}
						width='100%'
						justifyContent='space-between'
						background={getColor({ theme, colorMode, type: 'background' })}
						borderBottomWidth='2px'
						borderBottomStyle='solid'
						borderBottomColor={getColor({ theme, colorMode, type: 'divider' })}
						p={2}
					>
						<IconButton
							aria-label='SideBar Navigation Menu Button'
							colorMode={colorMode}
							onClick={() => onSidebarOpen()}
							size={device === 'mobile' ? 'sm' : 'md'}
							variant='icon'
						>
							<IconButtonIcon icon='menu' />
						</IconButton>

						<HStack spacing={1.5}>
							<Center as={Fade} in={location.pathname !== '/search'}>
								<InternalLink to='/search'>
									<IconButton
										aria-label='Search Button'
										colorMode={colorMode}
										size={device === 'mobile' ? 'sm' : 'md'}
										variant='icon'
									>
										<IconButtonIcon icon='search' />
									</IconButton>
								</InternalLink>
							</Center>

							<Internationalization size={device === 'mobile' ? 'sm' : 'md'} />

							{!isGuest ? (
								<User />
							) : (
								<InternalLink
									to='/authentication/signin'
									isDisabled={location.pathname === '/authentication/signin'}
								>
									<Button
										color={color}
										colorMode={colorMode}
										size={device === 'mobile' ? 'sm' : 'md'}
									>
										Sign in
									</Button>
								</InternalLink>
							)}
						</HStack>
					</HStack>
				</Fade>

				<Fade
					in={!isAuthenticationRoute}
					transition={{ enter: { ...config }, exit: { ...config } }}
					style={{ width: '100%', position: 'fixed', top: `${headerHeight}px`, zIndex: 1 }}
				>
					<Gradient deg={180} />
				</Fade>

				<VStack
					width='100%'
					height='100%'
					minHeight={!isAuthenticationRoute ? `calc(100vh - ${headerHeight}px)` : '100vh'}
					position='relative'
					top={0}
					zIndex={0}
					alignItems='stretch'
					justifyContent='stretch'
					spacing={0}
					pt={!isAuthenticationRoute ? `${headerHeight}px` : 0}
				>
					<Center
						width='100%'
						height='100%'
						minHeight='inherit'
						alignItems='stretch'
						justifyContent='stretch'
					>
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
			</VStack>

			<Sidebar isOpen={isSidebarOpen} onClose={onSidebarClose} />
		</>
	);
};

export default StructureMobileTablet;
