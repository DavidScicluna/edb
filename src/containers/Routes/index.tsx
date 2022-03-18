import { ReactElement, lazy, useEffect } from 'react';
import { useLocation, Routes as RRDRoutes, Route } from 'react-router-dom';

import { useConst } from '@chakra-ui/react';

import { AnimatePresence } from 'framer-motion';
import omit from 'lodash/omit';

import Animation from './components/Animation';
import Breadcrumb from './components/Breadcrumb';
import NoMatch from './components/NoMatch';
import Private from './components/Private';
import Public from './components/Public';
import Suspense from './components/Suspense';
import { Route as RouteType } from './types';

import Layout from '../Layout';

const Home = lazy(() => import('../../pages/Home'));
const Movies = lazy(() => import('../../pages/Movies'));
const People = lazy(() => import('../../pages/People'));
const Search = lazy(() => import('../../pages/Search'));
const Trending = lazy(() => import('../../pages/Trending'));
const TV = lazy(() => import('../../pages/TV'));
const Liked = lazy(() => import('../../pages/User/pages/Liked'));
const Lists = lazy(() => import('../../pages/User/pages/Lists'));
const Collection = lazy(() => import('../../pages/View/pages/Collection'));
const Episode = lazy(() => import('../../pages/View/pages/Episode'));
const Signin = lazy(() => import('../../pages/Authentication/Signin'));
const Register = lazy(() => import('../../pages/Authentication/Register'));
const Movie = lazy(() => import('../../pages/View/pages/Movie'));
const Person = lazy(() => import('../../pages/View/pages/Person'));
const Show = lazy(() => import('../../pages/View/pages/Show'));

export const allRoutes: RouteType[] = [
	// Private Routes
	{
		path: '/',
		children: [
			{
				path: '/',
				children: [
					{
						path: '/',
						breadcrumb: 'Home',
						children: [
							{
								path: '/search',
								breadcrumb: 'Search',
								element: <Search />
							},
							{
								path: '/trending',
								breadcrumb: 'Trending',
								element: <Trending />
							},
							{
								path: '/movies',
								breadcrumb: 'Movies',
								children: [
									{
										path: '/movies/:id',
										breadcrumb: (props) => <Breadcrumb {...props} mediaType='movie' />,
										element: <Movie />
									}
								],
								element: <Movies />
							},
							{
								path: '/tvshows',
								breadcrumb: 'TV Shows',
								children: [
									{
										path: '/tvshows/:id',
										breadcrumb: (props) => <Breadcrumb {...props} mediaType='tv' />,
										children: [
											{
												path: '/tvshows/:id/season/:season/episode/:episode',
												breadcrumb: (props) => <Breadcrumb {...props} mediaType='episode' />,
												element: <Episode />
											}
										],
										element: <Show />
									}
								],
								element: <TV />
							},
							{
								path: '/people',
								breadcrumb: 'People',
								children: [
									{
										path: '/people/:id',
										breadcrumb: (props) => <Breadcrumb {...props} mediaType='person' />,
										element: <Person />
									}
								],
								element: <People />
							},
							{
								path: '/liked',
								breadcrumb: 'Liked',
								element: <Liked />
							},
							{
								path: '/lists',
								breadcrumb: 'Lists',
								element: <Lists />
							},
							{
								path: '/collections/:id',
								breadcrumb: (props) => <Breadcrumb {...props} mediaType='collection' />,
								element: <Collection />
							},
							{
								path: '*',
								element: <NoMatch />
							}
						],
						element: <Home />
					}
				],
				element: <Layout />
			}
		],
		element: <Private />
	},

	// Public Routes
	{
		path: '/',
		children: [
			{
				path: '/signin',
				element: <Signin />
			},
			{
				path: '/register',
				element: <Register />
			},
			{
				path: '*',
				element: <NoMatch />
			}
		],
		element: <Public />
	}
];

const handleReturnRoute = (route: Omit<RouteType, 'breadcrumb'>): ReactElement => {
	const { path, element, children = [] } = route;

	return (
		<Route
			{...route}
			key={path}
			path={path}
			element={
				<Suspense>
					<Animation>{element}</Animation>
				</Suspense>
			}
		>
			{children.map((child) => handleReturnRoute(child))}
		</Route>
	);
};

const Routes = (): ReactElement => {
	const location = useLocation();

	const routes = useConst<Omit<RouteType, 'breadcrumb'>[]>([
		...allRoutes.map((route) => omit(route, 'breadcrumb'))
		// {
		// 	path: '*',
		// 	element: isNil(user) || isEmpty(user) ? <Signin /> : <NoMatch />
		// }
	]);

	useEffect(() => {
		document.scrollingElement?.scrollTo(0, 0);
	}, [location.pathname]);

	return (
		<AnimatePresence exitBeforeEnter initial={false}>
			<RRDRoutes key={location.key} location={location}>
				{routes.map((route) => handleReturnRoute(route))}
			</RRDRoutes>
		</AnimatePresence>
	);
};

export default Routes;
