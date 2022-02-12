import { ReactElement, useEffect } from 'react';

import { AnimatePresence } from 'framer-motion';
import { useLocation, Switch, Route } from 'react-router-dom';

import Button from '../../../../components/Clickable/Button';
import Link from '../../../../components/Clickable/Link';
import Error from '../../../../pages/Error';
import Home from '../../../../pages/Home';
import Movies from '../../../../pages/Movies';
import People from '../../../../pages/People';
import Search from '../../../../pages/Search';
import Trending from '../../../../pages/Trending';
import TV from '../../../../pages/TV';
import Liked from '../../../../pages/User/pages/Liked';
import Lists from '../../../../pages/User/pages/Lists';
import Collection from '../../../../pages/View/pages/Collection';
import Movie from '../../../../pages/View/pages/Movie';
import Person from '../../../../pages/View/pages/Person';
import Show from '../../../../pages/View/pages/Show';
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
    path: '/movies',
    name: 'Movies',
    children: <Movies />
  },
  {
    path: '/movies/:id',
    name: 'Movie',
    children: <Movie />
  },
  {
    path: '/tvshows',
    name: 'TV Shows',
    children: <TV />
  },
  {
    path: '/tvshows/:id',
    name: 'TV Show',
    children: <Show />
  },
  {
    path: '/people',
    name: 'People',
    children: <People />
  },
  {
    path: '/people/:id',
    name: 'Person',
    children: <Person />
  },
  {
    path: '/collections/:id',
    name: 'Collection',
    children: <Collection />
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
