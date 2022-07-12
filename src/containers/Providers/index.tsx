import { FC } from 'react';

import { theme } from '@davidscicluna/component-library';

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';

import { Provider as ReduxProvider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import Router from '../Router';
import store from '../../store';
import Container from '../Container';

// TODO: Maybe clear defaultOptions
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

const Providers: FC = () => {
	return (
		<ReduxProvider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<ChakraProvider theme={theme} resetCSS>
					<ColorModeScript initialColorMode={theme.config.initialColorMode} />
					<QueryClientProvider client={queryClient}>
						<Router>
							<Container />
						</Router>
					</QueryClientProvider>
				</ChakraProvider>
			</PersistGate>
		</ReduxProvider>
	);
};

export default Providers;
