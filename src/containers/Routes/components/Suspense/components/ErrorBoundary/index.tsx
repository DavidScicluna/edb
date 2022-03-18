import { Component, ErrorInfo } from 'react';

import { Container } from '@chakra-ui/react';

import Actions from './components/Actions';
import { ErrorBoundaryProps, State } from './types';

import Error from '../../../../../../pages/Error';

class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
	public state: State = {
		hasError: false
	};

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public static getDerivedStateFromError(_: Error): State {
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error('Uncaught error:', error, errorInfo);
	}

	public render() {
		if (this.state.hasError) {
			return (
				<Container maxWidth='container.md' centerContent>
					<Error
						code={404}
						title='Oh no! 😭'
						subtitle='Unfortunately, something went wrong when trying to render the application. Please refresh to try again!'
						renderActions={(props) => <Actions {...props} />}
					/>
				</Container>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
