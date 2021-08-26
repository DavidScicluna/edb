import React, { ReactElement, useEffect } from 'react';

import { Box } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation, Switch, Route } from 'react-router-dom';

import Home from '../../../../pages/Home';
import Liked from '../../../../pages/Liked';
import Lists from '../../../../pages/Lists';
import Movies from '../../../../pages/Movies';
import MoviesNowPlaying from '../../../../pages/Movies/NowPlaying';
import PopularMovies from '../../../../pages/Movies/Popular';
import TopRatedMovies from '../../../../pages/Movies/TopRated';
import UpcomingMovies from '../../../../pages/Movies/Upcoming';
import People from '../../../../pages/People';
import Person from '../../../../pages/Person';
import Search from '../../../../pages/Search';
import Trending from '../../../../pages/Trending';
import TV from '../../../../pages/TV';
import TVAiringToday from '../../../../pages/TV/AiringToday';
import OnTV from '../../../../pages/TV/OnTV';
import PopularTV from '../../../../pages/TV/Popular';
import TopRatedTV from '../../../../pages/TV/TopRated';

const ComponentBox = motion(Box);

const Page = ({ children }: { children: ReactElement }): ReactElement => {
  return (
    <ComponentBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 1,
        ease: [0.76, 0, 0.24, 1]
      }}>
      {children}
    </ComponentBox>
  );
};

const Routes = (): ReactElement => {
  const location = useLocation();

  useEffect(() => {
    document.scrollingElement?.scrollTo(0, 0);
  }, [location]);

  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <Switch location={location} key={location.pathname}>
        {/* Home Route */}
        <Route exact path='/'>
          <Page>
            <Home />
          </Page>
        </Route>

        {/* Liked Routes */}
        <Route exact path='/liked'>
          <Page>
            <Liked />
          </Page>
        </Route>
        <Route exact path='/liked/:mediaType'>
          <Page>
            <Liked />
          </Page>
        </Route>

        {/* Lists Routes */}
        <Route exact path='/lists'>
          <Page>
            <Lists />
          </Page>
        </Route>
        <Route exact path='/lists/:id'>
          <Page>
            <Lists />
          </Page>
        </Route>
        <Route exact path='/lists/:id/:mediaType'>
          <Page>
            <Lists />
          </Page>
        </Route>

        {/* Search Route */}
        <Route exact path='/search'>
          <Page>
            <Search />
          </Page>
        </Route>

        {/* Trending Routes */}
        <Route exact path='/trending'>
          <Page>
            <Trending />
          </Page>
        </Route>
        <Route exact path='/trending/:mediaType'>
          <Page>
            <Trending />
          </Page>
        </Route>

        {/* Movies Routes */}
        <Route exact path='/movies'>
          <Page>
            <Movies />
          </Page>
        </Route>
        <Route exact path='/movies/popular'>
          <Page>
            <PopularMovies />
          </Page>
        </Route>
        <Route exact path='/movies/upcoming'>
          <Page>
            <UpcomingMovies />
          </Page>
        </Route>
        <Route exact path='/movies/now-playing'>
          <Page>
            <MoviesNowPlaying />
          </Page>
        </Route>
        <Route exact path='/movies/top-rated'>
          <Page>
            <TopRatedMovies />
          </Page>
        </Route>

        {/* TV Routes */}
        <Route exact path='/tv'>
          <Page>
            <TV />
          </Page>
        </Route>
        <Route exact path='/tv/popular'>
          <Page>
            <PopularTV />
          </Page>
        </Route>
        <Route exact path='/tv/airing-today'>
          <Page>
            <TVAiringToday />
          </Page>
        </Route>
        <Route exact path='/tv/on-tv'>
          <Page>
            <OnTV />
          </Page>
        </Route>
        <Route exact path='/tv/top-rated'>
          <Page>
            <TopRatedTV />
          </Page>
        </Route>

        {/* People Route */}
        <Route exact path='/people'>
          <Page>
            <People />
          </Page>
        </Route>
        <Route exact path='/person/:id'>
          <Page>
            <Person />
          </Page>
        </Route>
      </Switch>
    </AnimatePresence>
  );
};

export default Routes;
