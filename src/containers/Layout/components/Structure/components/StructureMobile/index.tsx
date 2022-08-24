import { FC, useState, useCallback, useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router';

import { useTheme, TabBar, Icon, utils } from '@davidscicluna/component-library';

import { useBoolean, VStack, Center } from '@chakra-ui/react';

import { useElementSize } from 'usehooks-ts';
import { compact } from 'lodash';

import { isGuest as defaultIsGuest } from '../../common/data/defaultPropValues';
import { StructureCommonProps as StructureMobileProps } from '../../common/types';
import Gradient from '../Gradient';
import { useUserTheme, useSelector } from '../../../../../../common/hooks';
import UserPopper from '../UserPopper';
import Avatar from '../../../../../../components/Avatar';

const paths = ['/', '/search', '/trending', '/authentication/signin'];

const { checkIsTouchDevice } = utils;

const isTouchDevice: boolean = checkIsTouchDevice();

const StructureMobile: FC<StructureMobileProps> = ({ children, isGuest = defaultIsGuest }) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const location = useLocation();
	const navigate = useNavigate();

	const activeUser = useSelector((state) => state.users.data.activeUser);
	const { name, avatar_path } = activeUser.data.info;

	const [tabBarRef, { height: tabBarHeight }] = useElementSize();

	const [activeTab, setActiveTab] = useState<number>(paths.findIndex((path) => path === location.pathname));

	const [isPopperOpen, setIsPopperOpen] = useBoolean();
	const [isHoveringPopper, setIsHoveringPopper] = useBoolean();

	// TODO: Check if with guest this logic is correct
	const handleTabBarChange = useCallback(
		(index: number) => {
			setActiveTab(index);

			if (!isGuest ? index !== 3 : true) {
				navigate(paths[index]);
			}
		},
		[paths]
	);

	useEffect(() => setActiveTab(paths.findIndex((path) => path === location.pathname)), [location.pathname]);

	return (
		<VStack width='100%' minHeight='100vh' position='relative' spacing={0}>
			<Center width='100%' minHeight={`calc(100vh - ${tabBarHeight}px)`} position='relative' top={0}>
				{children}
			</Center>

			<Gradient position='fixed' bottom={tabBarHeight} />

			<Center ref={tabBarRef} width='100%' position='fixed' bottom={0}>
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
									category={location.pathname === paths[0] ? 'filled' : 'outlined'}
								/>
							),
							label: 'Home'
						},
						{
							renderIcon: (props) => (
								<Icon
									{...props}
									icon='search'
									category={location.pathname === paths[1] ? 'filled' : 'outlined'}
								/>
							),
							label: 'Search'
						},
						{
							renderIcon: (props) => (
								<Icon
									{...props}
									icon='whatshot'
									category={location.pathname === paths[2] ? 'filled' : 'outlined'}
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
											category={location.pathname === paths[3] ? 'filled' : 'outlined'}
										/>
									),
									label: 'Sign in'
							  }
					])}
				/>
			</Center>
		</VStack>
	);
};

export default StructureMobile;
