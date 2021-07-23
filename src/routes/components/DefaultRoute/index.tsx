import React, { ReactElement } from 'react';

import { Container } from '@chakra-ui/react';
import { useLocation, Route } from 'react-router-dom';

import Layout from '../../../containers/Layout';
import Page from '../../../containers/Page';
import { DefaultRouteProps } from './types';

const DefaultRoute = ({ component: Component, breadcrumbs, ...rest }: DefaultRouteProps): ReactElement => {
  const location = useLocation();

  sessionStorage.setItem('redirect_to', JSON.stringify(location));

  return (
    <Route
      {...rest}
      render={(props) => (
        <Container>
          <Layout {...props} breadcrumbs={breadcrumbs}>
            <Page>
              <Component {...props} />
            </Page>
          </Layout>
        </Container>
      )}
    />
  );
};

export default DefaultRoute;
