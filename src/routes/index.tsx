import React, { ReactElement } from 'react';

import { BrowserRouter, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import DefaultRoute from './DefaultRoute';

const Router = (): ReactElement => {
  return (
    <BrowserRouter>
      <Switch>
        {/* Home Route */}
        <DefaultRoute exact path='/' component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
