import React, { ReactElement } from 'react';

import { Container, Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useLocation, Route } from 'react-router-dom';

import Layout from '../../../containers/Layout';
import { DefaultRouteProps } from './types';

const ComponentBox = motion(Box);

const DefaultRoute = ({ children, breadcrumbs, ...rest }: DefaultRouteProps): ReactElement => {
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
              {children}
            </ComponentBox>
          </Layout>
        </Container>
      )}
    />
  );
};

export default DefaultRoute;
