import { ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';

import { useBoolean, ChakraProvider } from '@chakra-ui/react';

import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { useTimeout } from 'usehooks-ts';

import Splashscreen from './components/Splashscreen';

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
	const [isSplashscreenOpen, setIsSplashscreenOpen] = useBoolean(true);

	useTimeout(() => setIsSplashscreenOpen.off(), 2500);

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<ChakraProvider theme={theme}>
					<QueryClientProvider client={queryClient}>
						{isSplashscreenOpen ? <Splashscreen isOpen={isSplashscreenOpen} /> : <Layout />}
					</QueryClientProvider>
				</ChakraProvider>
			</PersistGate>
		</Provider>
	);
};

export default App;
