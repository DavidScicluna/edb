import { ReactElement, lazy, useEffect } from 'react';

import { useConst } from '@chakra-ui/react';

import { useLocation, Routes as RRDRoutes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { compact } from 'lodash';
import omit from 'lodash/omit';

import { guest } from '../../store/slices/Users';
import Layout from '../Layout';

import Animation from './components/Animation';
import Breadcrumb from './components/Breadcrumb';
import NoMatch from './components/NoMatch';
import Private from './components/Private';
import Public from './components/Public';
import Suspense from './components/Suspense';
import { Route as RouteType } from './types';


const Home = lazy(() => import('../../pages/Home'));
const Movies = lazy(() => import('../../pages/Movies'));
const People = lazy(() => import('../../pages/People'));
const Search = lazy(() => import('../../pages/Search'));
const Trending = lazy(() => import('../../pages/Trending'));
const ForgotPassword = lazy(() => import('../../pages/Authentication/ForgotPassword'));
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

export const handleReturnRoutes = (user?: string): RouteType[] => {
	return [
		// Private Routes
		{
			path: '/',
			children: [
				{
					path: '/',
					children: compact([
						{
							index: true,
							breadcrumb: 'Home',
							element: <Home />
						},
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
							element: <Movies />
						},
						{
							path: '/movies/:id',
							breadcrumb: (props) => <Breadcrumb {...props} mediaType='movie' />,
							element: <Movie />
						},
						{
							path: '/tvshows',
							breadcrumb: 'TV Shows',
							element: <TV />
						},
						{
							path: '/tvshows/:id',
							breadcrumb: (props) => <Breadcrumb {...props} mediaType='tv' />,
							element: <Show />
						},
						{
							path: '/tvshows/:id/season/:season/episode/:episode',
							breadcrumb: (props) => <Breadcrumb {...props} mediaType='episode' />,
							element: <Episode />
						},
						{
							path: '/people',
							breadcrumb: 'People',
							element: <People />
						},
						{
							path: '/people/:id',
							breadcrumb: (props) => <Breadcrumb {...props} mediaType='person' />,
							element: <Person />
						},
						user !== guest.data.id
							? {
									path: '/liked',
									breadcrumb: 'Liked',
									element: <Liked />
							  }
							: null,
						user !== guest.data.id
							? {
									path: '/lists',
									breadcrumb: 'Lists',
									element: <Lists />
							  }
							: null,
						{
							path: '/collections/:id',
							breadcrumb: (props) => <Breadcrumb {...props} mediaType='collection' />,
							element: <Collection />
						},
						{
							path: '*',
							element: <NoMatch />
						}
					]),
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
					path: '/forgot-password',
					element: <ForgotPassword />
				},
				{
					path: '*',
					element: <NoMatch />
				}
			],
			element: <Public />
		}
	];
};

const handleReturnRoute = (route: Omit<RouteType, 'index' | 'breadcrumb'>, index: string): ReactElement => {
	const { path, element, children = [] } = route;

	return (
		<Route
			{...route}
			key={index}
			path={path}
			element={
				<Suspense>
					<Animation>{element}</Animation>
				</Suspense>
			}
		>
			{children.map((child, childIndex) => handleReturnRoute(child, `${index}${childIndex}`))}
		</Route>
	);
};

export const allRoutes: RouteType[] = handleReturnRoutes();

const Routes = (): ReactElement => {
	const location = useLocation();

	const routes = useConst<Omit<RouteType, 'breadcrumb'>[]>(allRoutes.map((route) => omit(route, 'breadcrumb')));

	useEffect(() => {
		document.scrollingElement?.scrollTo(0, 0);
	}, [location.pathname]);

	return (
		<AnimatePresence exitBeforeEnter initial={false}>
			<RRDRoutes key={location.pathname} location={location}>
				{routes.map((route, index) => handleReturnRoute(route, `${index}`))}
			</RRDRoutes>
		</AnimatePresence>
	);
};

export default Routes;
