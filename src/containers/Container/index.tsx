import { ReactElement, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Splashscreen from './components/Splashscreen';

import { useCheckIcons, usePopulateOptions, useSelector } from '../../common/hooks';
import { toggleSplashscreen } from '../../store/slices/Modals';
import Router from '../Router';
import Routes from '../Routes';

const Container = (): ReactElement => {
	const dispatch = useDispatch();
	const isSplashscreenOpen = useSelector((state) => state.modals.ui.isSplashscreenOpen);

	useCheckIcons();

	usePopulateOptions();

	useEffect(() => {
		if (isSplashscreenOpen) {
			setTimeout(() => dispatch(toggleSplashscreen()), 2500);
		}
	}, [isSplashscreenOpen]);

	return <Router>{isSplashscreenOpen ? <Splashscreen isOpen /> : <Routes />}</Router>;
};

export default Container;
