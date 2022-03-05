import { ReactElement, lazy, useEffect, Suspense } from 'react';
import { useLocation, Routes as RRDRoutes, Route } from 'react-router-dom';

import { useConst } from '@chakra-ui/react';

import { AnimatePresence } from 'framer-motion';
import _ from 'lodash';

import Animation from './components/Animation';
import Breadcrumb from './components/Breadcrumb';
import ErrorBoundary from './components/ErrorBoundary';
import NoMatch from './components/NoMatch';
import { Route as RouteType } from './types';

const Home = lazy(() => import('../../../../pages/Home'));
const Movies = lazy(() => import('../../../../pages/Movies'));
const People = lazy(() => import('../../../../pages/People'));
const Search = lazy(() => import('../../../../pages/Search'));
const Trending = lazy(() => import('../../../../pages/Trending'));
const TV = lazy(() => import('../../../../pages/TV'));
const Liked = lazy(() => import('../../../../pages/User/pages/Liked'));
const Lists = lazy(() => import('../../../../pages/User/pages/Lists'));
const Collection = lazy(() => import('../../../../pages/View/pages/Collection'));
const Episode = lazy(() => import('../../../../pages/View/pages/Episode'));
const Movie = lazy(() => import('../../../../pages/View/pages/Movie'));
const Person = lazy(() => import('../../../../pages/View/pages/Person'));
const Show = lazy(() => import('../../../../pages/View/pages/Show'));

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
		<ErrorBoundary>
			<Suspense fallback={<div>Loading...</div>}>
				<AnimatePresence exitBeforeEnter initial={false}>
					<RRDRoutes location={location} key={location.pathname}>
						{routes.map((route) => handleReturnRoutes(route))}
					</RRDRoutes>
				</AnimatePresence>
			</Suspense>
		</ErrorBoundary>
	);
};

export default Routes;
