import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';

import { ChakraProvider } from '@chakra-ui/react';

import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import store from './store';
import theme from './theme';

import Container from './containers/Container';

// Importing Main Font (Work-Sans)
import '@fontsource/work-sans/100.css';
import '@fontsource/work-sans/200.css';
import '@fontsource/work-sans/300.css';
import '@fontsource/work-sans/400.css';
import '@fontsource/work-sans/500.css';
import '@fontsource/work-sans/600.css';
import '@fontsource/work-sans/700.css';
import '@fontsource/work-sans/800.css';
import '@fontsource/work-sans/900.css';
// Importing Logo Font (Pacifico)
import '@fontsource/pacifico/400.css';

// Importing Material UI Icons
import '@fontsource/material-icons';
import '@fontsource/material-icons-outlined';

import './index.css';

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

ReactDOM.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<ChakraProvider theme={theme}>
				<QueryClientProvider client={queryClient}>
					<Container />
				</QueryClientProvider>
			</ChakraProvider>
		</PersistGate>
	</Provider>,
	document.getElementById('root')
);
