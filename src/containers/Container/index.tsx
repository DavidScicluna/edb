import { ReactElement } from 'react';

import { useBoolean } from '@chakra-ui/react';

import { useTimeout } from 'usehooks-ts';

import Splashscreen from './components/Splashscreen';

import Router from '../Router';
import Routes from '../Routes';

const Container = (): ReactElement => {
	const [isSplashscreenOpen, setIsSplashscreenOpen] = useBoolean(true);

	useTimeout(() => setIsSplashscreenOpen.off(), 2500);

	return (
		<>
			{isSplashscreenOpen ? (
				<Splashscreen isOpen />
			) : (
				<Router>
					<Routes />
				</Router>
			)}
		</>
	);
};

export default Container;
