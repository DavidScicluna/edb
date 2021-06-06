import React, { ReactElement } from 'react';

import { BrowserRouter, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import PopularMovies from '../pages/Movies/Popular';
import DefaultRoute from './DefaultRoute';

const Router = (): ReactElement => {
  return (
    <BrowserRouter>
      <Switch>
        {/* Home Route */}
        <DefaultRoute exact path='/' component={Home} />

        {/* Movies Routes */}
        <DefaultRoute exact path='/movies/popular' component={PopularMovies} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
