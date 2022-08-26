import { FC, useState, useCallback, useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router';

import { useTheme, TabBar, Icon, Fade, utils } from '@davidscicluna/component-library';

import { useBoolean, useConst, VStack, Center } from '@chakra-ui/react';

import { useElementSize } from 'usehooks-ts';
import { Transition } from 'framer-motion';
import { compact } from 'lodash';

import { isGuest as defaultIsGuest } from '../../common/data/defaultPropValues';
import { StructureCommonProps as StructureMobileProps } from '../../common/types';
import Gradient from '../Gradient';
import { useUserTheme, useSelector } from '../../../../../../common/hooks';
import UserPopper from '../UserPopper';
import Avatar from '../../../../../../components/Avatar';

const { checkIsTouchDevice, getTransitionDuration } = utils;

const isTouchDevice: boolean = checkIsTouchDevice();

const tabPaths = ['/', '/search', '/trending', '/signin'];

const authPaths = ['/signin', '/register', '/forgot-password'];

const StructureMobile: FC<StructureMobileProps> = ({ children, isGuest = defaultIsGuest }) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const location = useLocation();
	const navigate = useNavigate();

	const activeUser = useSelector((state) => state.users.data.activeUser);
	const { name, avatar_path } = activeUser.data.info;

	const [tabBarRef, { height: tabBarHeight }] = useElementSize();

	const [activeTab, setActiveTab] = useState<number>(tabPaths.findIndex((path) => path === location.pathname));

	const [isPopperOpen, setIsPopperOpen] = useBoolean();
	const [isHoveringPopper, setIsHoveringPopper] = useBoolean();

	const [isAuthentication, setisAuthentication] = useBoolean();

	const duration = useConst<number>(getTransitionDuration({ theme, duration: 'slow' }));

	const config = useConst<Transition>({ duration });

	// TODO: Check if with guest this logic is correct
	const handleTabBarChange = useCallback(
		(index: number) => {
			setActiveTab(index);

			if (!isGuest ? index !== 3 : true) {
				navigate(tabPaths[index]);
			}
		},
		[tabPaths]
	);

	useEffect(() => setActiveTab(tabPaths.findIndex((path) => path === location.pathname)), [location.pathname]);

	useEffect(() => setisAuthentication[authPaths.includes(location.pathname) ? 'on' : 'off'](), [location.pathname]);

	return (
		<VStack width='100%' minHeight='100vh' position='relative' spacing={0}>
			<Center
				width='100%'
				minHeight={!isAuthentication ? `calc(100vh - ${tabBarHeight}px)` : '100vh'}
				position='relative'
				top={!isAuthentication ? tabBarHeight : 0}
			>
				{children}
			</Center>

			<Fade
				in={!isAuthentication}
				style={{ width: '100%', position: 'fixed', bottom: tabBarHeight }}
				transition={{ enter: { ...config }, exit: { ...config } }}
			>
				<Gradient />
			</Fade>

			<Fade
				in={!isAuthentication}
				style={{ width: '100%', position: 'fixed', bottom: 0 }}
				transition={{ enter: { ...config }, exit: { ...config } }}
			>
				<Center ref={tabBarRef} width='100%'>
					<TabBar
						color={color}
						colorMode={colorMode}
						activeTab={isPopperOpen ? 3 : activeTab}
						onChange={handleTabBarChange}
						tabs={compact([
							{
								renderIcon: (props) => (
									<Icon
										{...props}
										icon='home'
										category={location.pathname === tabPaths[0] ? 'filled' : 'outlined'}
									/>
								),
								label: 'Home'
							},
							{
								renderIcon: (props) => (
									<Icon
										{...props}
										icon='search'
										category={location.pathname === tabPaths[1] ? 'filled' : 'outlined'}
									/>
								),
								label: 'Search'
							},
							{
								renderIcon: (props) => (
									<Icon
										{...props}
										icon='whatshot'
										category={location.pathname === tabPaths[2] ? 'filled' : 'outlined'}
									/>
								),
								label: 'Trending'
							},
							!isGuest
								? {
										renderIcon: () => (
											<Center mb={1}>
												<UserPopper
													isOpen={isPopperOpen}
													gutter={32}
													placement='bottom-end'
													renderAction={() => (
														<Avatar
															alt={name}
															borderRadius='full'
															src={{ full: avatar_path }}
															size={theme.fontSizes['3xl']}
														/>
													)}
												/>
											</Center>
										),
										label: 'You',
										onClick: () => setIsPopperOpen.on(),
										onBlur: !isHoveringPopper ? () => setIsPopperOpen.off() : undefined,
										onMouseEnter: !isTouchDevice ? () => setIsHoveringPopper.on() : undefined,
										onMouseLeave: !isTouchDevice ? () => setIsHoveringPopper.off() : undefined,
										sx: isPopperOpen ? { cursor: 'pointer', pointerEvents: 'auto' } : {}
								  }
								: {
										renderIcon: (props) => (
											<Icon
												{...props}
												icon='login'
												category={location.pathname === tabPaths[3] ? 'filled' : 'outlined'}
											/>
										),
										label: 'Sign in'
								  }
						])}
					/>
				</Center>
			</Fade>
		</VStack>
	);
};

export default StructureMobile;
