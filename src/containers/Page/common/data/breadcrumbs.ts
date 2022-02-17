import { Breadcrumb } from '../../types';

const home: Breadcrumb = {
	label: 'Home',
	to: { pathname: '/' }
};

const search = {
	label: 'Search',
	to: { pathname: '/search' }
};

const trending = {
	label: 'Trending',
	to: { pathname: '/trending' }
};

const movies: Breadcrumb = {
	label: 'Movies',
	to: { pathname: '/movies' }
};

const tv: Breadcrumb = {
	label: 'TV Shows',
	to: { pathname: '/tv' }
};

const people: Breadcrumb = {
	label: 'People',
	to: { pathname: '/people' }
};

const liked = {
	label: 'Liked',
	to: { pathname: '/liked' }
};

const lists = {
	label: 'Lists',
	to: { pathname: '/lists' }
};

// '/person/:id': {
//   label: 'Person',
//   consistsOf: ['/', '/people', '/person/:id']
// }

export { home, search, trending, movies, tv, people, liked, lists };
