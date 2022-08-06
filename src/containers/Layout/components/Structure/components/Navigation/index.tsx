import { FC } from 'react';

import { useLocation } from 'react-router';

import { NavItemType, useTheme, SideNavigation, NavItem, Icon } from '@davidscicluna/component-library';

import { useDispatch } from 'react-redux';

import useStyles from '../../../../common/styles';
import { useSelector, useUserTheme } from '../../../../../../common/hooks';
import { isGuest as defaultIsGuest } from '../../common/data/defaultPropValues';
import { StructureCommonProps as NavigationProps } from '../../common/types';
import { toggleUserThemeModal } from '../../../../../../store/slices/Modals';

const navItems: NavItemType[] = [
	{ title: 'Home', path: { pathname: '/' }, renderLeftIcon: (props) => <Icon {...props} icon='home' /> },
	{
		title: 'Search',
		path: { pathname: '/search' },
		renderLeftIcon: (props) => <Icon {...props} icon='search' category='outlined' />
	},
	{
		title: 'Trending',
		path: { pathname: '/trending' },
		renderLeftIcon: (props) => <Icon {...props} icon='whatshot' category='outlined' />
	},
	{
		title: 'Movies',
		path: { pathname: '/movies' },
		renderLeftIcon: (props) => <Icon {...props} icon='theaters' category='outlined' />
	},
	{
		title: 'TV Shows',
		path: { pathname: '/tvshows' },
		renderLeftIcon: (props) => <Icon {...props} icon='tv' category='outlined' />
	},
	{
		title: 'People',
		path: { pathname: '/people' },
		renderLeftIcon: (props) => <Icon {...props} icon='people_alt' category='outlined' />
	}
];

const Navigation: FC<NavigationProps> = ({ isGuest = defaultIsGuest }) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const location = useLocation();

	const dispatch = useDispatch();
	const sidebarMode = useSelector((state) => state.app.ui.sidebarMode);
	const isUserThemeModalOpen = useSelector((state) => state.modals.ui.isUserThemeModalOpen);

	const style = useStyles({ theme });

	return (
		<SideNavigation color={color} colorMode={colorMode} mode={sidebarMode} spacing={1} sx={{ ...style }}>
			{navItems.map((navItem) => (
				<NavItem key={navItem.title} {...navItem} isActive={location.pathname === navItem.path.pathname} />
			))}

			{isGuest && (
				<NavItem
					title='Display'
					path={{}}
					isActive={isUserThemeModalOpen}
					renderLeftIcon={(props) => (
						<Icon {...props} icon='palette' category={isUserThemeModalOpen ? 'filled' : 'outlined'} />
					)}
					onClick={() => dispatch(toggleUserThemeModal(true))}
				/>
			)}
		</SideNavigation>
	);
};

export default Navigation;
