import { FC, useState, useCallback, useEffect } from 'react';

import { useLocation, useNavigate, Outlet } from 'react-router-dom';

import { TabBar, Icon, utils } from '@davidscicluna/component-library';

import { useBoolean, VStack, Center } from '@chakra-ui/react';

import { useElementSize } from 'usehooks-ts';

import Gradient from '../Gradient';
import { useUserTheme, useSelector } from '../../../../../../common/hooks';
import ScrollToTop from '../../../ScrollToTop';
import UserPopper from '../UserPopper';
import Avatar from '../../../../../../components/Avatar';

const paths = ['/', '/search', '/trending'];

const { checkIsTouchDevice } = utils;

const isTouchDevice: boolean = checkIsTouchDevice();

const StructureMobile: FC = () => {
	const { color, colorMode } = useUserTheme();

	const location = useLocation();
	const navigate = useNavigate();

	const user = useSelector((state) => state.users.data.activeUser);
	const { name, avatar_path } = user.data.info;

	const [tabBarRef, { height: tabBarHeight }] = useElementSize();

	const [activeTab, setActiveTab] = useState<number>(paths.findIndex((path) => path === location.pathname));

	const [isPopperOpen, setIsPopperOpen] = useBoolean();
	const [isHoveringPopper, setIsHoveringPopper] = useBoolean();

	const handleTabBarChange = useCallback(
		(index: number) => {
			if (index !== 3) {
				setActiveTab(index);
				navigate(paths[index]);
			}
		},
		[paths]
	);

	useEffect(() => setActiveTab(paths.findIndex((path) => path === location.pathname)), [location.pathname]);

	return (
		<VStack width='100%' minHeight='100vh' position='relative' spacing={0}>
			<Center width='100%' minHeight={`calc(100vh - ${tabBarHeight}px)`} position='relative' top={0}>
				<Outlet />

				<ScrollToTop />
			</Center>

			<Gradient position='fixed' bottom={tabBarHeight} />

			<Center ref={tabBarRef} width='100%' position='fixed' bottom={0}>
				<TabBar
					color={color}
					colorMode={colorMode}
					activeTab={!isPopperOpen ? activeTab : 3}
					onChange={handleTabBarChange}
					tabs={[
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
						{
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
												size='3xl'
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
					]}
				/>
			</Center>
		</VStack>
	);
};

export default StructureMobile;
