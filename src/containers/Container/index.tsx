import { FC } from 'react';

import { Fade } from '@davidscicluna/component-library';

import { useBoolean, Center } from '@chakra-ui/react';

import { AnimatePresence } from 'framer-motion';
import { useWillUnmount } from 'rooks';
import { useDispatch } from 'react-redux';
import { useIsFirstRender, useTimeout } from 'usehooks-ts';

import { usePopulateOptions, useSelector } from '../../common/hooks';
import Routes from '../Routes';
import { guest, setUser } from '../../store/slices/Users';
import Splashscreen from '../Splashscreen';
import Router from '../Router';

const Container: FC = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.users.data.activeUser);

	const isFirstRender = useIsFirstRender();

	const [isSplashscreenOpen, setSetIsSplashscreenOpen] = useBoolean(isFirstRender);

	usePopulateOptions();

	useTimeout(() => setSetIsSplashscreenOpen.off(), isSplashscreenOpen ? 5000 : null);

	useWillUnmount(() => {
		if (!user.data.credentials.rememberMe) {
			dispatch(setUser({ ...guest }));
		}
	});

	return (
		<Router>
			<AnimatePresence exitBeforeEnter initial={false}>
				<Center width='100%' minHeight='100vh' position='relative'>
					<Splashscreen
						key='ds-edb-splashscreen-key'
						isOpen={isSplashscreenOpen}
						onClose={() => setSetIsSplashscreenOpen.off()}
					/>

					<Fade
						key='ds-edb-routes-key'
						in={!isSplashscreenOpen}
						unmountOnExit
						style={{ width: '100%', minHeight: '100vh', position: 'absolute' }}
					>
						<Routes />
					</Fade>
				</Center>
			</AnimatePresence>
		</Router>
	);
};

export default Container;
