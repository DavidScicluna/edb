import React, { ReactElement } from 'react';

import { BrowserRouter, Switch } from 'react-router-dom';

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
import DefaultRoute from './DefaultRoute';

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

        {/* User Routes */}
        <DefaultRoute
          exact
          path='/liked'
          component={Liked}
          breadcrumbs={[breadcrumbs.home, { label: 'Liked', path: '/liked' }]}
        />
        <DefaultRoute
          exact
          path='/bookmarks'
          component={Lists}
          breadcrumbs={[breadcrumbs.home, { label: 'Bookmarks', path: '/bookmarks' }]}
        />
        <DefaultRoute
          exact
          path='/bookmarks/:id'
          component={Lists}
          breadcrumbs={[breadcrumbs.home, { label: 'Bookmarks', path: '/bookmarks' }]}
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
        <DefaultRoute exact path='/movies' component={Movies} breadcrumbs={[breadcrumbs.home, breadcrumbs.movies]} />
        <DefaultRoute
          exact
          path='/movies/popular'
          component={PopularMovies}
          breadcrumbs={[breadcrumbs.home, breadcrumbs.movies, { label: 'Popular Movies', path: '/movies/popular' }]}
        />
        <DefaultRoute
          exact
          path='/movies/upcoming'
          component={UpcomingMovies}
          breadcrumbs={[breadcrumbs.home, breadcrumbs.movies, { label: 'Upcoming Movies', path: '/movies/upcoming' }]}
        />
        <DefaultRoute
          exact
          path='/movies/now-playing'
          component={MoviesNowPlaying}
          breadcrumbs={[
            breadcrumbs.home,
            breadcrumbs.movies,
            { label: 'Movies now-playing', path: '/movies/now-playing' }
          ]}
        />
        <DefaultRoute
          exact
          path='/movies/top-rated'
          component={TopRatedMovies}
          breadcrumbs={[breadcrumbs.home, breadcrumbs.movies, { label: 'Top-rated movies', path: '/movies/top-rated' }]}
        />

        {/* TV Routes */}
        <DefaultRoute exact path='/tv' component={TV} breadcrumbs={[breadcrumbs.home, breadcrumbs.tv]} />
        <DefaultRoute
          exact
          path='/tv/popular'
          component={PopularTV}
          breadcrumbs={[breadcrumbs.home, breadcrumbs.tv, { label: 'Popular TV Shows', path: '/tv/popular' }]}
        />
        <DefaultRoute
          exact
          path='/tv/airing-today'
          component={TVAiringToday}
          breadcrumbs={[breadcrumbs.home, breadcrumbs.tv, { label: 'TV Shows Airing Today', path: '/tv/airing-today' }]}
        />
        <DefaultRoute
          exact
          path='/tv/on-tv'
          component={OnTV}
          breadcrumbs={[breadcrumbs.home, breadcrumbs.tv, { label: 'TV Shows on at the moment', path: '/tv/on-tv' }]}
        />
        <DefaultRoute
          exact
          path='/tv/top-rated'
          component={TopRatedTV}
          breadcrumbs={[breadcrumbs.home, breadcrumbs.tv, { label: 'Top-rated TV Shows', path: '/tv/top-rated' }]}
        />

        {/* People Route */}
        <DefaultRoute
          exact
          path='/people'
          component={People}
          breadcrumbs={[breadcrumbs.home, { label: 'People', path: '/people' }]}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
