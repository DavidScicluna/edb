import { FC } from 'react';

import { useLocation } from 'react-router';

import { useTheme, SideNavigation, Skeleton, NavItem, Icon } from '@davidscicluna/component-library';

import useStyles from '../../../../common/styles';
import { useSelector, useUserTheme } from '../../../../../../common/hooks';
import { formatMediaType, formatMediaTypeLabel, getMediaTypeIcon } from '../../../../../../common/utils';

import { NavItems, NavigationProps } from './types';

const navItems: NavItems = [
	{
		title: 'Home',
		path: { pathname: '/' },
		icon: 'home'
	},
	{
		title: 'Search',
		path: { pathname: '/search' },
		icon: 'search'
	},
	{
		title: 'Trending',
		path: { pathname: '/trending' },
		icon: 'whatshot'
	},
	{
		title: formatMediaTypeLabel({ type: 'multiple', mediaType: 'movie' }),
		path: { pathname: `/${formatMediaType({ mediaType: 'movie' })}` },
		handleIsChildActive: ({ pathname }) => pathname.includes(formatMediaType({ mediaType: 'movie' })),
		icon: getMediaTypeIcon({ mediaType: 'movie' })
	},
	{
		title: formatMediaTypeLabel({ type: 'multiple', mediaType: 'tv' }),
		path: { pathname: `/${formatMediaType({ mediaType: 'tv' })}` },
		handleIsChildActive: ({ pathname }) => pathname.includes(formatMediaType({ mediaType: 'tv' })),
		icon: getMediaTypeIcon({ mediaType: 'tv' })
	},
	{
		title: formatMediaTypeLabel({ type: 'multiple', mediaType: 'person' }),
		path: { pathname: `/${formatMediaType({ mediaType: 'person' })}` },
		handleIsChildActive: ({ pathname }) => pathname.includes(formatMediaType({ mediaType: 'person' })),
		icon: getMediaTypeIcon({ mediaType: 'person' })
	}
];

const Navigation: FC<NavigationProps> = ({ isDrawer = false, isDummy = false }) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const location = useLocation();

	const sidebarMode = useSelector((state) => state.app.ui.sidebarMode);
	const isUserThemeModalOpen = useSelector((state) => state.modals.ui.isUserThemeModalOpen);

	const style = useStyles({ theme });

	return (
		<SideNavigation
			color={color}
			colorMode={colorMode}
			isDrawer={isDrawer}
			mode={sidebarMode}
			spacing={1}
			sx={{ ...style }}
		>
			{navItems.map((navItem) => (
				<Skeleton key={navItem.title} isLoaded={!isDummy} variant='rectangle'>
					<NavItem
						{...navItem}
						isDisabled={isDummy}
						isActive={!isDummy && !isUserThemeModalOpen && location.pathname === navItem.path.pathname}
						isChildActive={!isDummy && navItem.handleIsChildActive && navItem.handleIsChildActive(location)}
						renderLeftIcon={(props) => (
							<Icon
								{...props}
								icon={navItem.icon}
								category={location.pathname === navItem.path.pathname ? 'filled' : 'outlined'}
							/>
						)}
					/>
				</Skeleton>
			))}
		</SideNavigation>
	);
};

export default Navigation;
