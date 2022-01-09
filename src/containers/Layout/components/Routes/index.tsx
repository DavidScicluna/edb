import { ReactElement, useEffect } from 'react';

import { AnimatePresence } from 'framer-motion';
import { useLocation, Switch, Route } from 'react-router-dom';

import Button from '../../../../components/Clickable/Button';
import Link from '../../../../components/Clickable/Link';
import Error from '../../../../pages/Error';
import Home from '../../../../pages/Home';
import Liked from '../../../../pages/Liked';
import Lists from '../../../../pages/Lists';
import Movies from '../../../../pages/Movies';
// import MoviesNowPlaying from '../../../../pages/Movies/pages/NowPlaying';
// import PopularMovies from '../../../../pages/Movies/pages/Popular';
// import TopRatedMovies from '../../../../pages/Movies/pages/TopRated';
// import UpcomingMovies from '../../../../pages/Movies/pages/Upcoming';
import People from '../../../../pages/People';
import Person from '../../../../pages/Person';
import Search from '../../../../pages/Search';
import Trending from '../../../../pages/Trending';
import TrendingMovies from '../../../../pages/Trending/pages/Movies';
import TrendingPeople from '../../../../pages/Trending/pages/People';
import TrendingTV from '../../../../pages/Trending/pages/TV';
import TV from '../../../../pages/TV';
// import TVAiringToday from '../../../../pages/TV/pages/AiringToday';
// import OnTV from '../../../../pages/TV/pages/OnTV';
// import PopularTV from '../../../../pages/TV/pages/Popular';
// import TopRatedTV from '../../../../pages/TV/pages/TopRated';
import Movie from '../../../../pages/View/Movie';
import Show from '../../../../pages/View/Show';
import Page from './components/Page';
import { Route as RouteType } from './types';

export const routes: RouteType[] = [
  {
    path: '/',
    name: 'Home',
    children: <Home />
  },
  {
    path: '/liked',
    name: 'Liked',
    children: <Liked />
  },
  {
    path: '/lists',
    name: 'Lists',
    children: <Lists />
  },
  {
    path: '/search',
    name: 'Search',
    children: <Search />
  },
  {
    path: '/trending',
    name: 'Trending',
    children: <Trending />
  },
  {
    path: '/trending/movie',
    name: 'Movies',
    children: <TrendingMovies />
  },
  {
    path: '/trending/tv',
    name: 'TV Shows',
    children: <TrendingTV />
  },
  {
    path: '/trending/person',
    name: 'People',
    children: <TrendingPeople />
  },
  {
    path: '/movies',
    name: 'Movies',
    children: <Movies />
  },
  {
    path: '/movie/:id',
    name: 'Movie',
    children: <Movie />
  },
  {
    path: '/tv',
    name: 'TV Shows',
    children: <TV />
  },
  {
    path: '/tv/:id',
    name: 'TV Show',
    children: <Show />
  },
  {
    path: '/people',
    name: 'People',
    children: <People />
  },
  {
    path: '/person/:id',
    name: 'Person',
    children: <Person />
  },
  {
    name: 'Error',
    children: (
      <Error
        code={404}
        title='Page not found!'
        subtitle='Please check the URL in the address bar and try again.'
        renderActions={({ color, colorMode, size }) => (
          <>
            <Link to={{ pathname: '/' }}>
              <Button color={color} colorMode={colorMode} variant='outlined' size={size}>
                Go back home
              </Button>
            </Link>
            <Button
              color={color}
              colorMode={colorMode}
              onClick={() => {
                window.location.reload();
                return false;
              }}
              size={size}
            >
              Try again
            </Button>
          </>
        )}
      />
    )
  }
];

const Routes = (): ReactElement => {
  const location = useLocation();

  useEffect(() => {
    if (!location.pathname.includes('search')) {
      document.scrollingElement?.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <Switch location={location} key={location.pathname}>
        {routes.map((route, index) => (
          <Route key={index} exact path={route.path}>
            <Page>{route.children}</Page>
          </Route>
        ))}
      </Switch>
    </AnimatePresence>
  );
};

export default Routes;
