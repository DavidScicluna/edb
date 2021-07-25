import React, { ReactElement } from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import Layout from '../../containers/Layout';
import theme from '../../theme';

const queryClient = new QueryClient();

const App = (): ReactElement => {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Layout />
      </QueryClientProvider>
    </ChakraProvider>
  );
};

export default App;
