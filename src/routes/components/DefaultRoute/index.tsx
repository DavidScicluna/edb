import React, { ComponentType, ReactElement } from 'react';

import { Container, Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useLocation, RouteComponentProps, Route, RouteProps } from 'react-router-dom';

import { Breadcrumb } from '../../../common/types/types';
import Layout from '../../../containers/Layout';

interface DefaultRouteProps extends RouteProps {
  component: ComponentType<RouteComponentProps | ComponentType>;
  breadcrumbs: Breadcrumb[];
}

const ComponentBox = motion(Box);

const DefaultRoute = ({ component: Component, breadcrumbs, ...rest }: DefaultRouteProps): ReactElement => {
  const location = useLocation();

  sessionStorage.setItem('redirect_to', JSON.stringify(location));

  return (
    <Route
      {...rest}
      render={(props) => (
        <Container>
          <Layout {...props} breadcrumbs={breadcrumbs}>
            <ComponentBox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1,
                ease: [0.76, 0, 0.24, 1]
              }}>
              <Component {...props} />
            </ComponentBox>
          </Layout>
        </Container>
      )}
    />
  );
};

export default DefaultRoute;
