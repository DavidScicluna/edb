import { FC } from 'react';

import { useLocation } from 'react-router';

import { NavItemType, useTheme, InternalLink } from '@davidscicluna/component-library';

import { useMediaQuery, Stack } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../../../../common/hooks';

const navItems: NavItemType[] = [
	{
		title: 'Home',
		path: { pathname: '/' }
	},
	{
		title: 'Search',
		path: { pathname: '/search' }
	},
	{
		title: 'Trending',
		path: { pathname: '/trending' }
	},
	{
		title: 'Movies',
		path: { pathname: '/movies' }
	},
	{
		title: 'TV Shows',
		path: { pathname: '/tvshows' }
	},
	{
		title: 'People',
		path: { pathname: '/people' }
	}
];

const FooterNavigation: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const location = useLocation();

	return (
		<Stack
			width='100%'
			direction={isSm ? 'column' : 'row'}
			alignItems='center'
			justifyContent='space-between'
			spacing={isSm ? 4 : 2}
		>
			{navItems.map((navItem) => (
				<InternalLink
					key={navItem.title}
					color={location.pathname === navItem.path.pathname ? color : 'gray'}
					colorMode={colorMode}
					to={{ ...navItem.path }}
					isDisabled={location.pathname === navItem.path.pathname}
					sx={{
						fontSize: 'md',
						fontWeight: 'semibold',
						textTransform: 'uppercase',
						textDecoration: 'none !important'
					}}
				>
					{navItem.title}
				</InternalLink>
			))}
		</Stack>
	);
};

export default FooterNavigation;
