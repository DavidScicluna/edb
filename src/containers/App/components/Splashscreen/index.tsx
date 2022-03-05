import { ReactElement } from 'react';
import { useDispatch } from 'react-redux';

import { useColorMode } from '@chakra-ui/react';

import { useTernaryDarkMode, useEffectOnce } from 'usehooks-ts';

import { SplashscreenProps } from './types';

import { useSelector } from '../../../../common/hooks';
import SplashscreenModal from '../../../../components/Splashscreen';
import { toggleSplashscreen } from '../../../../store/slices/Modals';

const Splashscreen = ({ isOpen = false }: SplashscreenProps): ReactElement => {
	const { setColorMode } = useColorMode();

	const dispatch = useDispatch();
	const background = useSelector((state) => state.user.ui.theme.background);

	const { isDarkMode } = useTernaryDarkMode();

	useEffectOnce(() => {
		if (background === 'system') {
			dispatch(toggleSplashscreen(true));

			setColorMode(isDarkMode ? 'dark' : 'light');

			setTimeout(() => dispatch(toggleSplashscreen(false)), 5000);
		}
	});

	return <SplashscreenModal isOpen={isOpen} />;
};

export default Splashscreen;
