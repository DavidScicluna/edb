import React, { ReactElement, Suspense as RSuspense } from 'react';

import { Box } from '@chakra-ui/react';

import ErrorBoundary from './components/ErrorBoundary';
import { SuspenseProps } from './types';

const Suspense = ({ children }: SuspenseProps): ReactElement => {
	return (
		<ErrorBoundary>
			<RSuspense fallback={<Box />}>{children}</RSuspense>
		</ErrorBoundary>
	);
};

export default Suspense;
