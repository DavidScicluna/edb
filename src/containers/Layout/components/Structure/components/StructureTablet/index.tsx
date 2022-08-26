import { FC, useState, useEffect } from 'react';

import { useLocation } from 'react-router';

import { useTheme, InternalLink, Button, IconButton, Icon, Fade, utils } from '@davidscicluna/component-library';

import { useDisclosure, useBoolean, useConst, VStack, HStack, Center } from '@chakra-ui/react';

import { useElementSize, useUpdateEffect } from 'usehooks-ts';
import { Transition } from 'framer-motion';

import { useUserTheme } from '../../../../../../common/hooks';
import Gradient from '../Gradient';
import { isGuest as defaultIsGuest } from '../../common/data/defaultPropValues';
import { StructureCommonProps as StructureTabletProps } from '../../common/types';

import Sidebar from './components/Sidebar';
import User from './components/User';

const { getColor, getTransitionDuration } = utils;

const authPaths = ['/signin', '/register', '/forgot-password'];

const StructureTablet: FC<StructureTabletProps> = ({ children, isGuest = defaultIsGuest }) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const location = useLocation();

	const { isOpen: isSidebarOpen, onOpen: onSidebarOpen, onClose: onSidebarClose } = useDisclosure();

	const [headerRef, { height: headerHeight }] = useElementSize();

	const [isAuthentication, setisAuthentication] = useBoolean();

	const [background, setBackground] = useState<string>(getColor({ theme, colorMode, type: 'background' }));

	const duration = useConst<number>(getTransitionDuration({ theme, duration: 'slow' }));

	const config = useConst<Transition>({ duration });

	useUpdateEffect(() => setBackground(getColor({ theme, colorMode, type: 'background' })), [colorMode]);

	useUpdateEffect(() => onSidebarClose(), [location.pathname]);

	useEffect(() => setisAuthentication[authPaths.includes(location.pathname) ? 'on' : 'off'](), [location.pathname]);

	return (
		<>
			<VStack width='100%' minHeight='100vh' position='relative' spacing={0}>
				<Fade
					in={!isAuthentication}
					style={{ width: '100%', position: 'fixed', top: 0 }}
					transition={{ enter: { ...config }, exit: { ...config } }}
				>
					<HStack
						ref={headerRef}
						width='100%'
						justifyContent='space-between'
						background={background}
						backgroundColor={background}
						borderBottomWidth='2px'
						borderBottomStyle='solid'
						borderBottomColor={getColor({ theme, colorMode, type: 'divider' })}
						p={2}
					>
						<IconButton
							aria-label='SideBar Navigation Menu Button'
							colorMode={colorMode}
							onClick={() => onSidebarOpen()}
							variant='icon'
						>
							<Icon icon='menu' />
						</IconButton>

						<HStack spacing={2}>
							<Fade in={location.pathname !== '/search'} unmountOnExit>
								<InternalLink to='/search'>
									<IconButton aria-label='Search Button' colorMode={colorMode} variant='icon'>
										<Icon icon='search' />
									</IconButton>
								</InternalLink>
							</Fade>

							{!isGuest ? (
								<User />
							) : (
								<InternalLink to='/signin'>
									<Button color={color}>Sign in</Button>
								</InternalLink>
							)}
						</HStack>
					</HStack>
				</Fade>

				<Fade
					in={!isAuthentication}
					style={{ width: '100%', position: 'fixed', top: headerHeight }}
					transition={{ enter: { ...config }, exit: { ...config } }}
				>
					<Gradient />
				</Fade>

				<Center
					width='100%'
					minHeight={!isAuthentication ? `calc(100vh - ${headerHeight}px)` : '100vh'}
					position='relative'
					top={headerHeight}
				>
					{children}
				</Center>
			</VStack>

			<Sidebar isOpen={isSidebarOpen} onClose={onSidebarClose} />
		</>
	);
};

export default StructureTablet;
