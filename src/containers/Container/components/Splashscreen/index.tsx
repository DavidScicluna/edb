import { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { useColorMode } from '@chakra-ui/react';

import { isEmpty, isNil } from 'lodash';
import { useTernaryDarkMode, useEffectOnce } from 'usehooks-ts';

import { SplashscreenProps } from './types';

import { useSelector } from '../../../../common/hooks';
import SplashscreenModal from '../../../../components/Splashscreen';
import { toggleSplashscreen } from '../../../../store/slices/Modals';
import { defaultUser, getUser } from '../../../../store/slices/Users';

const Splashscreen = ({ isOpen = false }: SplashscreenProps): ReactElement => {
	const { setColorMode } = useColorMode();

	const navigate = useNavigate();

	const dispatch = useDispatch();
	const user = useSelector((state) => state.app.data.user);
	const colorMode = useSelector(
		(state) =>
			getUser(state.users.data.users, state.app.data.user)?.ui.theme.colorMode || defaultUser.ui.theme.colorMode
	);

	const { isDarkMode } = useTernaryDarkMode();

	useEffectOnce(() => {
		if (colorMode === 'system') {
			dispatch(toggleSplashscreen(true));

			setColorMode(isDarkMode ? 'dark' : 'light');

			setTimeout(() => dispatch(toggleSplashscreen(false)), 5000);
		}

		if (isNil(user) || isEmpty(user)) {
			navigate('/signin');
		}
	});

	return <SplashscreenModal isOpen={isOpen} />;
};

export default Splashscreen;
