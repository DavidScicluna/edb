import { Component, ErrorInfo, Suspense as RS, SuspenseProps } from 'react';

import { Button } from '@davidscicluna/component-library';

import { Show } from '@chakra-ui/react';

import Error from '../Error';

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
					renderActions={(props) => (
						<>
							<Show breakpoint='(max-width: 600px)'>
								<Button {...props} isFullWidth onClick={() => window.location.reload()}>
									Refresh
								</Button>
							</Show>
							<Show breakpoint='(min-width: 600px)'>
								<Button {...props} onClick={() => window.location.reload()}>
									Refresh
								</Button>
							</Show>
						</>
					)}
				/>
			);
		}

		return <RS fallback={this.props.fallback}>{this.props.children}</RS>;
	}
}

export default Suspense;
