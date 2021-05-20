import React, { ComponentType, ReactElement } from 'react';

import { useLocation, RouteComponentProps, Route, RouteProps } from 'react-router-dom';

import { Breadcrumb } from '../common/types/types';
import Layout from '../containers/Layout';

interface DefaultRouteProps extends RouteProps {
  component: ComponentType<RouteComponentProps | ComponentType>;
  // breadcrumbs: Breadcrumb;
}

const DefaultRoute = ({
  component: Component,
  // breadcrumbs,
  ...rest
}: DefaultRouteProps): ReactElement => {
  const location = useLocation();

  sessionStorage.setItem('redirect_to', JSON.stringify(location));

  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout {...props}>
          <Component
            {...props}
            //  breadcrumbs={breadcrumbs}
          />
        </Layout>
      )}
    />
  );
};

export default DefaultRoute;
