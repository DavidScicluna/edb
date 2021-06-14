import React, { ReactElement } from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import Router from '../../routes';
import theme from '../../theme';

const queryClient = new QueryClient();

const App = (): ReactElement => {
  console.log(theme);
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </ChakraProvider>
  );
};

export default App;
