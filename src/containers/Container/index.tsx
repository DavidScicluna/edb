import { ReactElement, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { useEventListener } from 'usehooks-ts';


import { useCheckIcons, usePopulateOptions, useSelector } from '../../common/hooks';
import { setUser } from '../../store/slices/App';
import { toggleSplashscreen } from '../../store/slices/Modals';
import { getUser } from '../../store/slices/Users';
import Router from '../Router';
import Routes from '../Routes';

import Splashscreen from './components/Splashscreen';

const Container = (): ReactElement => {
	const dispatch = useDispatch();
	const isSplashscreenOpen = useSelector((state) => state.modals.ui.isSplashscreenOpen);
	const user = useSelector((state) => getUser(state.users.data.users, state.app.data.user));

	useCheckIcons();

	usePopulateOptions();

	useEffect(() => {
		if (isSplashscreenOpen) {
			setTimeout(() => dispatch(toggleSplashscreen(false)), 2500);
		}
	}, [isSplashscreenOpen]);

	useEventListener('beforeunload', () => {
		if (user && !user.data.credentials?.rememberMe) {
			dispatch(setUser(undefined));
		}
	});

	return <Router>{isSplashscreenOpen ? <Splashscreen isOpen /> : <Routes />}</Router>;
};

export default Container;
