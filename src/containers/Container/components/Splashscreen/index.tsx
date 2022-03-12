import { ReactElement } from 'react';
import { useDispatch } from 'react-redux';

import { useColorMode } from '@chakra-ui/react';

import { useTernaryDarkMode, useEffectOnce } from 'usehooks-ts';

import { SplashscreenProps } from './types';

import { useSelector } from '../../../../common/hooks';
import SplashscreenModal from '../../../../components/Splashscreen';
import { toggleSplashscreen } from '../../../../store/slices/Modals';
import { defaultUser, getUser } from '../../../../store/slices/Users';

const Splashscreen = ({ isOpen = false }: SplashscreenProps): ReactElement => {
	const { setColorMode } = useColorMode();

	const dispatch = useDispatch();
	const background = useSelector(
		(state) =>
			getUser(state.users.data.users, state.app.data.user)?.ui.theme.background || defaultUser.ui.theme.background
	);

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
