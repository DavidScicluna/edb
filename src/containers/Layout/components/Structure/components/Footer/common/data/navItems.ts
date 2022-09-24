import { NavItemType } from '@davidscicluna/component-library';

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

export default navItems;
