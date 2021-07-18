import React, { ReactElement } from 'react';

import { AnimatePresence } from 'framer-motion';
import { useLocation, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import Liked from '../pages/Liked';
import Lists from '../pages/Lists';
import Movies from '../pages/Movies';
import MoviesNowPlaying from '../pages/Movies/NowPlaying';
import PopularMovies from '../pages/Movies/Popular';
import TopRatedMovies from '../pages/Movies/TopRated';
import UpcomingMovies from '../pages/Movies/Upcoming';
import People from '../pages/People';
import Search from '../pages/Search';
import Trending from '../pages/Trending';
import TV from '../pages/TV';
import TVAiringToday from '../pages/TV/AiringToday';
import OnTV from '../pages/TV/OnTV';
import PopularTV from '../pages/TV/Popular';
import TopRatedTV from '../pages/TV/TopRated';
import DefaultRoute from './components/DefaultRoute';

const Router = (): ReactElement => {
  const location = useLocation();

  const breadcrumbs = {
    home: { label: 'Home', path: '/' },
    liked: { label: 'Liked', path: '/liked' },
    lists: { label: 'Lists', path: '/lists' },
    trending: { label: 'Trending', path: '/trending' },
    movies: { label: 'Movies', path: '/movies' },
    tv: { label: 'TV Shows', path: '/tv' }
  };

  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <Switch location={location} key={location.pathname}>
        {/* Home Route */}
        <DefaultRoute exact path='/' component={Home} breadcrumbs={[breadcrumbs.home]} />

        {/* Liked Routes */}
        <DefaultRoute exact path='/liked' component={Liked} breadcrumbs={[breadcrumbs.home, breadcrumbs.liked]} />
        <DefaultRoute
          exact
          path='/liked/:mediaType'
          component={Liked}
          breadcrumbs={[breadcrumbs.home, breadcrumbs.liked]}
        />

        {/* Lists Routes */}
        <DefaultRoute exact path='/lists' component={Lists} breadcrumbs={[breadcrumbs.home, breadcrumbs.lists]} />
        <DefaultRoute exact path='/lists/:id' component={Lists} breadcrumbs={[breadcrumbs.home, breadcrumbs.lists]} />
        <DefaultRoute
          exact
          path='/lists/:id/:mediaType'
          component={Lists}
          breadcrumbs={[breadcrumbs.home, breadcrumbs.lists]}
        />

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
          path='/trending/:mediaType'
          component={Trending}
          breadcrumbs={[breadcrumbs.home, breadcrumbs.trending]}
        />

        {/* Movies Routes */}
        <DefaultRoute exact path='/movies' component={Movies} breadcrumbs={[breadcrumbs.home, breadcrumbs.movies]} />
        <DefaultRoute
          exact
          path='/movies/popular'
          component={PopularMovies}
          breadcrumbs={[breadcrumbs.home, breadcrumbs.movies, { label: 'Popular', path: '/movies/popular' }]}
        />
        <DefaultRoute
          exact
          path='/movies/upcoming'
          component={UpcomingMovies}
          breadcrumbs={[breadcrumbs.home, breadcrumbs.movies, { label: 'Upcoming', path: '/movies/upcoming' }]}
        />
        <DefaultRoute
          exact
          path='/movies/now-playing'
          component={MoviesNowPlaying}
          breadcrumbs={[breadcrumbs.home, breadcrumbs.movies, { label: 'Now Playing', path: '/movies/now-playing' }]}
        />
        <DefaultRoute
          exact
          path='/movies/top-rated'
          component={TopRatedMovies}
          breadcrumbs={[breadcrumbs.home, breadcrumbs.movies, { label: 'Top Rated', path: '/movies/top-rated' }]}
        />

        {/* TV Routes */}
        <DefaultRoute exact path='/tv' component={TV} breadcrumbs={[breadcrumbs.home, breadcrumbs.tv]} />
        <DefaultRoute
          exact
          path='/tv/popular'
          component={PopularTV}
          breadcrumbs={[breadcrumbs.home, breadcrumbs.tv, { label: 'Popular', path: '/tv/popular' }]}
        />
        <DefaultRoute
          exact
          path='/tv/airing-today'
          component={TVAiringToday}
          breadcrumbs={[breadcrumbs.home, breadcrumbs.tv, { label: 'Airing Today', path: '/tv/airing-today' }]}
        />
        <DefaultRoute
          exact
          path='/tv/on-tv'
          component={OnTV}
          breadcrumbs={[breadcrumbs.home, breadcrumbs.tv, { label: 'On at the moment', path: '/tv/on-tv' }]}
        />
        <DefaultRoute
          exact
          path='/tv/top-rated'
          component={TopRatedTV}
          breadcrumbs={[breadcrumbs.home, breadcrumbs.tv, { label: 'Top Rated', path: '/tv/top-rated' }]}
        />

        {/* People Route */}
        <DefaultRoute
          exact
          path='/people'
          component={People}
          breadcrumbs={[breadcrumbs.home, { label: 'People', path: '/people' }]}
        />
      </Switch>
    </AnimatePresence>
  );
};

export default Router;
