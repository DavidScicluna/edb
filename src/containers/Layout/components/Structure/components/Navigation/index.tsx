import { FC } from 'react';

import { useLocation } from 'react-router';

import { NavItemType, useTheme, SideNavigation, Skeleton, NavItem, Icon } from '@davidscicluna/component-library';

import useStyles from '../../../../common/styles';
import { useSelector, useUserTheme } from '../../../../../../common/hooks';

import { NavigationProps } from './types';

const navItems: NavItemType[] = [
	{
		title: 'Home',
		path: { pathname: '/' },
		renderLeftIcon: (props) => <Icon {...props} icon='home' />
	},
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

const Navigation: FC<NavigationProps> = ({ isDummy = false }) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const location = useLocation();

	const sidebarMode = useSelector((state) => state.app.ui.sidebarMode);
	const isUserThemeModalOpen = useSelector((state) => state.modals.ui.isUserThemeModalOpen);

	const style = useStyles({ theme });

	return (
		<SideNavigation color={color} colorMode={colorMode} mode={sidebarMode} spacing={1} sx={{ ...style }}>
			{navItems.map((navItem) => (
				<Skeleton key={navItem.title} isLoaded={!isDummy} variant='rectangle'>
					<NavItem
						{...navItem}
						isDisabled={isDummy}
						isActive={!isDummy && !isUserThemeModalOpen && location.pathname === navItem.path.pathname}
					/>
				</Skeleton>
			))}
		</SideNavigation>
	);
};

export default Navigation;
