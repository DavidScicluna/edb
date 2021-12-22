import { ReactElement, useEffect } from 'react';

import { AnimatePresence } from 'framer-motion';
import { useLocation, Switch, Route } from 'react-router-dom';

import Page from './components/Page';
import routes from './data';

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

        {/* Home Route */}
        {/* <Route exact path='/'>
          <Page>
           
          </Page>
        </Route> */}

        {/* Liked Routes */}
        {/* <Route exact path=''>
          <Page>
      
          </Page>
        </Route>
        <Route exact path='/liked/:mediaType'>
          <Page>
            <Liked />
          </Page>
        </Route> */}

        {/* Lists Routes */}
        {/* <Route exact path='/lists'>
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
        </Route> */}

        {/* Search Route */}
        {/* <Route exact path='/search'>
          <Page>
            <Search />
          </Page>
        </Route> */}

        {/* Trending Routes */}
        {/* <Route exact path='/trending'>
          <Page>
            <Trending />
          </Page>
        </Route>
        <Route exact path='/trending/:mediaType'>
          <Page>
            <Trending />
          </Page>
        </Route> */}

        {/* Movies Routes */}
        {/* <Route exact path='/movies'>
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
        <Route exact path='/movie/:id'>
          <Page>
            <Movie />
          </Page>
        </Route> */}

        {/* TV Routes */}
        {/* <Route exact path='/tv'>
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
        <Route exact path='/tv/:id'>
          <Page>
            <Show />
          </Page>
        </Route> */}

        {/* People Route */}
        {/* <Route exact path='/people'>
          <Page>
            <People />
          </Page>
        </Route>
        <Route exact path='/person/:id'>
          <Page>
            <Person />
          </Page>
        </Route> */}

        {/* <Route>
          <Page></Page>
        </Route> */}
      </Switch>
    </AnimatePresence>
  );
};

export default Routes;
