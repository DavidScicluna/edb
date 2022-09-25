import { Component, ErrorInfo, Suspense as RS, SuspenseProps } from 'react';

import Error from '../../containers/Routes/components/Error';

import SuspenseActions from './components/SuspenseActions';
import { State } from './types';

class Suspense extends Component<SuspenseProps, State> {
	public state: State = {
		hasError: false
	};

	public static getDerivedStateFromError(): State {
		return { hasError: true };
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		// TODO: Show Toast Alert!
		console.error('Uncaught error:', error, errorInfo);
	}

	public render() {
		if (this.state.hasError) {
			return (
				<Error
					code={404}
					title='Oh no! 😭'
					subtitle='Unfortunately, something went wrong when trying to render the application. Please refresh to try again!'
					renderActions={(props) => <SuspenseActions {...props} />}
				/>
			);
		}

		return <RS fallback={this.props.fallback}>{this.props.children}</RS>;
	}
}

export default Suspense;
