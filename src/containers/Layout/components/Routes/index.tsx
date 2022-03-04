import React, { ReactElement, useEffect } from 'react';
import { useLocation, Routes as RRDRoutes, Route } from 'react-router-dom';

import { useConst } from '@chakra-ui/react';

import { AnimatePresence } from 'framer-motion';
import _ from 'lodash';

import Animation from './components/Animation';
import Breadcrumb from './components/Breadcrumb';
import NoMatch from './components/NoMatch';
import { Route as RouteType } from './types';

import Home from '../../../../pages/Home';
import Movies from '../../../../pages/Movies';
import People from '../../../../pages/People';
import Search from '../../../../pages/Search';
import Trending from '../../../../pages/Trending';
import TV from '../../../../pages/TV';
import Liked from '../../../../pages/User/pages/Liked';
import Lists from '../../../../pages/User/pages/Lists';
import Collection from '../../../../pages/View/pages/Collection';
import Episode from '../../../../pages/View/pages/Episode';
import Movie from '../../../../pages/View/pages/Movie';
import Person from '../../../../pages/View/pages/Person';
import Show from '../../../../pages/View/pages/Show';

export const allRoutes: RouteType[] = [
	{
		path: '/',
		breadcrumb: 'Home',
		element: <Home />
	},
	{
		path: 'search',
		breadcrumb: 'Search',
		element: <Search />
	},
	{
		path: 'trending',
		breadcrumb: 'Trending',
		element: <Trending />
	},
	{
		path: 'movies',
		breadcrumb: 'Movies',
		element: <Movies />
	},
	{
		path: 'movies/:id',
		breadcrumb: (props) => <Breadcrumb {...props} mediaType='movie' />,
		element: <Movie />
	},
	{
		path: 'tvshows',
		breadcrumb: 'TV Shows',
		element: <TV />
		// children: [
		// 	{
		// 		path: ':id',
		// 		breadcrumb: 'TV Show',
		// 		element: <Show />,
		// 		children: [
		// 			{
		// 				path: 'season/:season/episode/:episode',
		// 				breadcrumb: 'TV Show Episode',
		// 				element: <Episode />
		// 			}
		// 		]
		// 	}
		// ]
	},
	{
		path: 'tvshows/:id',
		breadcrumb: (props) => <Breadcrumb {...props} mediaType='tv' />,
		element: <Show />
	},
	{
		path: 'tvshows/:id/season/:season/episode/:episode',
		breadcrumb: (props) => <Breadcrumb {...props} mediaType='episode' />,
		element: <Episode />
	},
	{
		path: 'people',
		breadcrumb: 'People',
		element: <People />
		// children: [
		// 	{
		// 		path: ':id',
		// 		breadcrumb: 'Person',
		// 		element: <Person />
		// 	}
		// ]
	},
	{
		path: 'people/:id',
		breadcrumb: (props) => <Breadcrumb {...props} mediaType='person' />,
		element: <Person />
	},
	{
		path: 'liked',
		breadcrumb: 'Liked',
		element: <Liked />
	},
	{
		path: 'lists',
		breadcrumb: 'Lists',
		element: <Lists />
	},
	{
		path: 'collections/:id',
		breadcrumb: (props) => <Breadcrumb {...props} mediaType='collection' />,
		element: <Collection />
	},
	{
		path: '*',
		element: <NoMatch />
	}
];

const Routes = (): ReactElement => {
	const location = useLocation();

	const routes = useConst(allRoutes.map((route) => _.omit(route, 'breadcrumb')));

	const handleReturnRoutes = (route: RouteType): ReactElement => {
		const { path, element, children = [] } = route;

		return (
			<Route {...route} key={path} path={path} element={<Animation>{element}</Animation>}>
				{children.map((child) => handleReturnRoutes(child))}
			</Route>
		);
	};

	useEffect(() => {
		document.scrollingElement?.scrollTo(0, 0);
	}, [location.pathname]);

	return (
		<AnimatePresence exitBeforeEnter initial={false}>
			<RRDRoutes location={location} key={location.pathname}>
				{routes.map((route) => handleReturnRoutes(route))}
			</RRDRoutes>
		</AnimatePresence>
	);
};

export default Routes;
