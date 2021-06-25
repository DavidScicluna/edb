import React, { ReactElement } from 'react';

import { Box } from '@chakra-ui/react';
import { BrowserRouter, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import PopularMovies from '../pages/Movies/Popular';
import Search from '../pages/Search';
import Trending from '../pages/Trending';
import DefaultRoute from './DefaultRoute';

const TempComp = () => {
  return <Box p={2}>Temporary component</Box>;
};

const Router = (): ReactElement => {
  const breadcrumbs = {
    home: { label: 'Home', path: '/' },
    trending: { label: 'Trending', path: '/trending' },
    movies: { label: 'Movies', path: '/movies' },
    tv: { label: 'TV Shows', path: '/tv' }
  };

  return (
    <BrowserRouter>
      <Switch>
        {/* Home Route */}
        <DefaultRoute exact path='/' component={Home} breadcrumbs={[breadcrumbs.home]} />

        {/* Search Route */}
        <DefaultRoute
          exact
          path='/search'
          component={Search}
          breadcrumbs={[breadcrumbs.home, { label: 'Search', path: '/search' }]}
        />

        {/* Trending Routes */}
        <DefaultRoute
          exact
          path='/trending'
          component={Trending}
          breadcrumbs={[breadcrumbs.home, breadcrumbs.trending]}
        />
        <DefaultRoute
          exact
          path='/trending/movie'
          component={Trending}
          breadcrumbs={[breadcrumbs.home, breadcrumbs.trending, { label: 'Movies', path: '/trending/movie' }]}
        />
        <DefaultRoute
          exact
          path='/trending/tv'
          component={Trending}
          breadcrumbs={[breadcrumbs.home, breadcrumbs.trending, { label: 'TV Shows', path: '/trending/tv' }]}
        />
        <DefaultRoute
          exact
          path='/trending/person'
          component={Trending}
          breadcrumbs={[breadcrumbs.home, breadcrumbs.trending, { label: 'People', path: '/trending/person' }]}
        />

        {/* Movies Routes */}
        <DefaultRoute exact path='/movies' component={TempComp} breadcrumbs={[breadcrumbs.home, breadcrumbs.movies]} />
        <DefaultRoute
          exact
          path='/movies/popular'
          component={PopularMovies}
          breadcrumbs={[breadcrumbs.home, breadcrumbs.movies, { label: 'Popular Movies', path: '/movies/popular' }]}
        />
        <DefaultRoute
          exact
          path='/movies/now-playing'
          component={TempComp}
          breadcrumbs={[
            breadcrumbs.home,
            breadcrumbs.movies,
            { label: 'Movies Now Playing', path: '/movies/now-playing' }
          ]}
        />
        <DefaultRoute
          exact
          path='/movies/upcoming'
          component={TempComp}
          breadcrumbs={[breadcrumbs.home, breadcrumbs.movies, { label: 'Upcoming Movies', path: '/movies/upcoming' }]}
        />
        <DefaultRoute
          exact
          path='/movies/top-rated'
          component={TempComp}
          breadcrumbs={[breadcrumbs.home, breadcrumbs.movies, { label: 'Top Rated Movies', path: '/movies/top-rated' }]}
        />

        {/* TV Routes */}
        <DefaultRoute exact path='/tv' component={TempComp} breadcrumbs={[breadcrumbs.home, breadcrumbs.tv]} />
        <DefaultRoute
          exact
          path='/tv/popular'
          component={TempComp}
          breadcrumbs={[breadcrumbs.home, breadcrumbs.tv, { label: 'Popular TV', path: '/tv/popular' }]}
        />
        <DefaultRoute
          exact
          path='/tv/airing-today'
          component={TempComp}
          breadcrumbs={[breadcrumbs.home, breadcrumbs.tv, { label: 'Shows Airing Today', path: '/tv/airing-today' }]}
        />
        <DefaultRoute
          exact
          path='/tv/on-tv'
          component={TempComp}
          breadcrumbs={[breadcrumbs.home, breadcrumbs.tv, { label: 'On TV', path: '/tv/on-tv' }]}
        />
        <DefaultRoute
          exact
          path='/tv/top-rated'
          component={TempComp}
          breadcrumbs={[breadcrumbs.home, breadcrumbs.tv, { label: 'Top Rated TV', path: '/tv/top-rated' }]}
        />

        {/* People Route */}
        <DefaultRoute
          exact
          path='/people'
          component={TempComp}
          breadcrumbs={[breadcrumbs.home, { label: 'People', path: '/people' }]}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
