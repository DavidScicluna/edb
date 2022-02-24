import { ReactElement, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { ColorMode, useColorMode } from '@chakra-ui/react';

import _ from 'lodash';

import { SplashscreenProps } from './types';

import { useCheckColorMode, useSelector } from '../../../../common/hooks';
import { toggleSplashscreen } from '../../../../store/slices/Modals';
import SplashscreenModal from '../../../Layout/components/Modals/Splashscreen';

const Splashscreen = ({ isOpen = false }: SplashscreenProps): ReactElement => {
	const { setColorMode } = useColorMode();

	const dispatch = useDispatch();
	const background = useSelector((state) => state.user.ui.theme.background);

	const mode = useCheckColorMode();

	const handleUpdateColorMode = useCallback(
		_.debounce((mode: ColorMode) => {
			dispatch(toggleSplashscreen(true));
			console.log(mode);

			setColorMode(mode);

			setTimeout(() => dispatch(toggleSplashscreen(false)), 5000);
		}, 500),
		[dispatch, toggleSplashscreen, setColorMode]
	);

	useEffect(() => {
		if (background === 'system') {
			handleUpdateColorMode(mode);
		}
	}, [mode]);

	return <SplashscreenModal isOpen={isOpen} />;
};

export default Splashscreen;
