import { ReactElement, lazy, useEffect, Suspense } from 'react';
import { useLocation, useNavigate, Routes as RRDRoutes, Route } from 'react-router-dom';

import { useConst, Box } from '@chakra-ui/react';

import { AnimatePresence } from 'framer-motion';
import { isEmpty, isNil } from 'lodash';
import omit from 'lodash/omit';

import Animation from './components/Animation';
import Breadcrumb from './components/Breadcrumb';
import ErrorBoundary from './components/ErrorBoundary';
import NoMatch from './components/NoMatch';
import { Route as RouteType } from './types';

import { useSelector } from '../../common/hooks';
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
const Signin = lazy(() => import('../../pages/Signin'));
const Register = lazy(() => import('../../pages/Register'));
const Movie = lazy(() => import('../../pages/View/pages/Movie'));
const Person = lazy(() => import('../../pages/View/pages/Person'));
const Show = lazy(() => import('../../pages/View/pages/Show'));

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
		path: 'signin',
		element: <Signin />
	},
	{
		path: 'register',
		element: <Register />
	}
];

const handleReturnRoutes = (route: RouteType): ReactElement => {
	const { path, element, children = [] } = route;

	return (
		<Route
			{...route}
			key={path}
			path={path}
			element={
				<Animation>
					<ErrorBoundary>
						<Suspense fallback={<Box />}>
							{path !== 'signin' && path !== 'register' ? <Layout>{element}</Layout> : element}
						</Suspense>
					</ErrorBoundary>
				</Animation>
			}
		>
			{children.map((child) => handleReturnRoutes(child))}
		</Route>
	);
};

const Routes = (): ReactElement => {
	const location = useLocation();
	const navigate = useNavigate();

	const user = useSelector((state) => state.app.data.user);

	const routes = useConst([
		...allRoutes.map((route) => omit(route, 'breadcrumb')),
		{
			path: '*',
			element: isNil(user) || isEmpty(user) ? <Signin /> : <NoMatch />
		}
	]);

	useEffect(() => {
		document.scrollingElement?.scrollTo(0, 0);

		if (isNil(user) || isEmpty(user)) {
			navigate('/signin');
		} else if (location.pathname === '/signin') {
			navigate('/');
		}
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
