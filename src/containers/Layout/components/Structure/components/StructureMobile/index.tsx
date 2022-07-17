import { FC, useState, useCallback } from 'react';

import { useLocation, useNavigate, Outlet } from 'react-router-dom';

import { TabBar, Icon } from '@davidscicluna/component-library';

import { VStack, Center, Avatar } from '@chakra-ui/react';

import { useElementSize, useUpdateEffect } from 'usehooks-ts';

import Gradient from '../Gradient';
import { useUserTheme, useSelector } from '../../../../../../common/hooks';
import ScrollToTop from '../../../ScrollToTop';

// TODO: Add Profile path
const paths = ['/', '/search', '/trending'];

const StructureMobile: FC = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const { color, colorMode } = useUserTheme();

	const user = useSelector((state) => state.users.data.activeUser);

	const [tabBarRef, { height: tabBarHeight }] = useElementSize();

	const [activeTab, setActiveTab] = useState<number>(paths.findIndex((path) => path === location.pathname));

	const handleTabBarChange = useCallback(
		(index: number) => {
			setActiveTab(index);
			navigate(paths[index]);
		},
		[paths]
	);

	useUpdateEffect(() => setActiveTab(paths.findIndex((path) => path === location.pathname)), [location.pathname]);

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
					activeTab={activeTab}
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
							renderIcon: (props) => (
								<Avatar {...props} name={user.data.info.name} src={user.data.info.avatar_path} />
							),
							label: 'You'
						}
					]}
				/>
			</Center>
		</VStack>
	);
};

export default StructureMobile;
