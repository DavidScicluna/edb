import { FC } from 'react';

import { useBoolean } from '@chakra-ui/react';

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
	const activeUser = useSelector((state) => state.users.data.activeUser);

	const isFirstRender = useIsFirstRender();

	const [isSplashscreenOpen, setSetIsSplashscreenOpen] = useBoolean(isFirstRender);
	const [isRoutesVisible, setSetIsRoutesVisible] = useBoolean();

	usePopulateOptions();

	useTimeout(() => setSetIsSplashscreenOpen.off(), isSplashscreenOpen ? 5000 : null);
	useTimeout(() => setSetIsRoutesVisible.on(), isSplashscreenOpen ? 4000 : null);

	useWillUnmount(() => {
		if (!activeUser.data.credentials.rememberMe) {
			dispatch(setUser({ ...guest }));
		}
	});

	return (
		<Router>
			<Splashscreen isOpen={isSplashscreenOpen} onClose={() => setSetIsSplashscreenOpen.off()} />

			{isRoutesVisible && <Routes />}
		</Router>
	);
};

export default Container;
