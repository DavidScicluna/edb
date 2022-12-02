import { Component, ErrorInfo } from 'react';

import Error from '../../../containers/Error';

import ErrorBoundaryActions from './components/ErrorBoundaryActions';
import { ErrorBoundaryProps, ErrorBoundaryState } from './types';

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	public state: ErrorBoundaryState = {
		hasError: false
	};

	public static getDerivedStateFromError(): ErrorBoundaryState {
		return { hasError: true };
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error('Uncaught error:', error, errorInfo);
	}

	public render() {
		if (this.state.hasError) {
			return (
				<Error
					code={404}
					title='Oh no! 😭'
					subtitle='Unfortunately, something went wrong when trying to render the application. Please refresh to try again!'
					renderActions={(props) => <ErrorBoundaryActions {...props} />}
				/>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
