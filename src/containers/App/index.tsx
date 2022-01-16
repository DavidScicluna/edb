import { ReactElement } from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import Layout from '../../containers/Layout';
import store from '../../store';
import theme from '../../theme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false
    }
  }
});

const persistor = persistStore(store);

const App = (): ReactElement => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <Layout />
          </QueryClientProvider>
        </ChakraProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
