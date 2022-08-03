import { FC } from 'react';

import { theme } from '@davidscicluna/component-library';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Provider as ReduxProvider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

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
						<Container />
						{process.env.NODE_ENV !== 'production' && <ReactQueryDevtools initialIsOpen={false} />}
					</QueryClientProvider>
				</ChakraProvider>
			</PersistGate>
		</ReduxProvider>
	);
};

export default Providers;
