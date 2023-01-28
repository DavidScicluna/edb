import { FC, useEffect, lazy } from 'react';

import { useLocation, Routes as RRRoutes, Route } from 'react-router';

import { AnimatePresence } from '@davidscicluna/component-library';

import Authentication from '../../pages/User/pages/Authentication';
import { Suspense } from '../../components';
import DummySearch from '../../pages/Search/DummySearch';
import DummyPerson from '../../pages/View/pages/Persons/DummyPerson';
import DummyHome from '../../pages/Home/DummyHome';
import DummyTrending from '../../pages/Trending/DummyTrending';
import DummyTVShows from '../../pages/TVShows/DummyTVShows';
import DummyTVShow from '../../pages/View/pages/TVShows/DummyTVShow';
import DummyEpisode from '../../pages/View/pages/Episodes/DummyEpisode';
import DummyUserProfile from '../../pages/User/pages/UserProfiles/DummyUserProfile';
import DummyMovies from '../../pages/Movies/DummyMovies';
import DummyMovie from '../../pages/View/pages/Movies/DummyMovie';
import DummyCollection from '../../pages/View/pages/Collections/DummyCollection';
import DummyEditUser from '../../pages/User/pages/EditUsers/DummyEditUser';
import DummyPeople from '../../pages/People/DummyPeople';
import { formatMediaType } from '../../common/utils';
import { useLayoutContext } from '../Layout/common/hooks';

import PageTransition from './components/PageTransition';
import NoMatch from './components/NoMatch';

const Home = lazy(() => import('../../pages/Home/OriginalHome'));
const Movies = lazy(() => import('../../pages/Movies/OriginalMovies'));
const Trending = lazy(() => import('../../pages/Trending/OriginalTrending'));
const UserProfile = lazy(() => import('../../pages/User/pages/UserProfiles/OriginalUserProfile'));
const EditUser = lazy(() => import('../../pages/User/pages/EditUsers/OriginalEditUser'));
const Search = lazy(() => import('../../pages/Search/OriginalSearch'));
const TVShows = lazy(() => import('../../pages/TVShows/OriginalTVShows'));
const People = lazy(() => import('../../pages/People/OriginalPeople'));
const Person = lazy(() => import('../../pages/View/pages/Persons/OriginalPerson'));
const ResetPassword = lazy(() => import('../../pages/User/pages/Authentication/pages/ResetPassword'));
const Collection = lazy(() => import('../../pages/View/pages/Collections/OriginalCollection'));
const Episode = lazy(() => import('../../pages/View/pages/Episodes/OriginalEpisode'));
const Signin = lazy(() => import('../../pages/User/pages/Authentication/pages/Signin'));
const Register = lazy(() => import('../../pages/User/pages/Authentication/pages/Register'));
const Movie = lazy(() => import('../../pages/View/pages/Movies/OriginalMovie'));
const TVShow = lazy(() => import('../../pages/View/pages/TVShows/OriginalTVShow'));

const Routes: FC = () => {
	const location = useLocation();

	const { isGuest } = useLayoutContext();

	useEffect(() => {
		setTimeout(() => window.scrollTo(0, 0), 1000);
	}, [location.pathname]);

	return (
		<AnimatePresence>
			<RRRoutes key={location.pathname} location={location}>
				<Route
					path='/'
					element={
						<PageTransition>
							<Suspense fallback={<DummyHome />}>
								<Home />
							</Suspense>
						</PageTransition>
					}
				/>

				<Route
					path='/profile'
					element={
						<PageTransition>
							{!isGuest ? (
								<Suspense fallback={<DummyUserProfile />}>
									<UserProfile />
								</Suspense>
							) : (
								<NoMatch />
							)}
						</PageTransition>
					}
				/>

				<Route
					path='/profile/edit'
					element={
						<PageTransition>
							{!isGuest ? (
								<Suspense fallback={<DummyEditUser />}>
									<EditUser />
								</Suspense>
							) : (
								<NoMatch />
							)}
						</PageTransition>
					}
				/>

				<Route
					path='/search'
					element={
						<PageTransition>
							<Suspense fallback={<DummySearch />}>
								<Search />
							</Suspense>
						</PageTransition>
					}
				/>

				<Route
					path='/trending'
					element={
						<PageTransition>
							<Suspense fallback={<DummyTrending />}>
								<Trending />
							</Suspense>
						</PageTransition>
					}
				/>

				<Route
					path={formatMediaType({ mediaType: 'movie' })}
					element={
						<PageTransition>
							<Suspense fallback={<DummyMovies />}>
								<Movies />
							</Suspense>
						</PageTransition>
					}
				/>

				<Route
					path={`${formatMediaType({ mediaType: 'movie' })}/:id`}
					element={
						<PageTransition>
							<Suspense fallback={<DummyMovie />}>
								<Movie />
							</Suspense>
						</PageTransition>
					}
				/>

				<Route
					path={`collections/:id`}
					element={
						<PageTransition>
							<Suspense fallback={<DummyCollection />}>
								<Collection />
							</Suspense>
						</PageTransition>
					}
				/>

				<Route
					path={formatMediaType({ mediaType: 'tv' })}
					element={
						<PageTransition>
							<Suspense fallback={<DummyTVShows />}>
								<TVShows />
							</Suspense>
						</PageTransition>
					}
				/>

				<Route
					path={`${formatMediaType({ mediaType: 'tv' })}/:id`}
					element={
						<PageTransition>
							<Suspense fallback={<DummyTVShow />}>
								<TVShow />
							</Suspense>
						</PageTransition>
					}
				/>

				<Route
					path={`${formatMediaType({ mediaType: 'tv' })}/:id/seasons/:season/episodes/:episode`}
					element={
						<PageTransition>
							<Suspense fallback={<DummyEpisode />}>
								<Episode />
							</Suspense>
						</PageTransition>
					}
				/>

				<Route
					path={formatMediaType({ mediaType: 'person' })}
					element={
						<PageTransition>
							<Suspense fallback={<DummyPeople />}>
								<People />
							</Suspense>
						</PageTransition>
					}
				/>

				<Route
					path={`${formatMediaType({ mediaType: 'person' })}/:id`}
					element={
						<PageTransition>
							<Suspense fallback={<DummyPerson />}>
								<Person />
							</Suspense>
						</PageTransition>
					}
				/>

				<Route
					path='/authentication'
					element={
						<PageTransition>
							<Suspense>
								<Authentication />
							</Suspense>
						</PageTransition>
					}
				>
					<Route
						path='/authentication/signin'
						element={
							<PageTransition>
								<Suspense>
									<Signin />
								</Suspense>
							</PageTransition>
						}
					/>

					<Route
						path='/authentication/register'
						element={
							<PageTransition>
								<Suspense>
									<Register />
								</Suspense>
							</PageTransition>
						}
					/>

					<Route
						path='/authentication/reset-password'
						element={
							<PageTransition>
								<Suspense>
									<ResetPassword />
								</Suspense>
							</PageTransition>
						}
					/>
				</Route>

				<Route
					path='*'
					element={
						<PageTransition>
							<NoMatch />
						</PageTransition>
					}
				/>
			</RRRoutes>
		</AnimatePresence>
	);
};

export default Routes;
