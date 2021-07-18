import React, { ReactElement } from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';

import Routes from '../../routes';
import theme from '../../theme';

const queryClient = new QueryClient();

const App = (): ReactElement => {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Routes />
        </BrowserRouter>
      </QueryClientProvider>
    </ChakraProvider>
  );
};

export default App;
