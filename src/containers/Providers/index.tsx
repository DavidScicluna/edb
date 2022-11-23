import { FC } from 'react';

import { DSCLProvider } from '@davidscicluna/component-library';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Provider as ReduxProvider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import store from '../../store';
import Container from '../Container';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: import.meta.env.PROD,
			refetchOnReconnect: import.meta.env.PROD,
			refetchOnMount: import.meta.env.PROD
		}
	}
});

const persistor = persistStore(store);

const Providers: FC = () => {
	return (
		<ReduxProvider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<DSCLProvider>
					<QueryClientProvider client={queryClient}>
						<Container />
					</QueryClientProvider>
				</DSCLProvider>
			</PersistGate>
		</ReduxProvider>
	);
};

export default Providers;
