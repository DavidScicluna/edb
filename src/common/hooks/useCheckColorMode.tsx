import { useCallback, useEffect } from 'react';

import { ColorMode, useColorMode } from '@chakra-ui/react';

import { useMediaMatch } from 'rooks';
// import { useDispatch } from 'react-redux';
import { debounce, memoize } from 'lodash';

import { guest } from '../../store/slices/Users';
import { UserThemeColorMode } from '../../store/slices/Users/types';
// import { toggleSpinnerModal } from '../../store/slices/Modals';

import { useSelector } from '.';

type GetModeProps = {
	colorMode: UserThemeColorMode;
	isDarkMode: boolean;
};

const getMode = memoize(({ colorMode, isDarkMode = false }: GetModeProps): ColorMode => {
	if (colorMode === 'system') {
		return isDarkMode ? 'dark' : 'light';
	} else {
		return colorMode;
	}
});

const useCheckColorMode = (): void => {
	const { setColorMode } = useColorMode();

	// const dispatch = useDispatch();
	const theme = useSelector((state) => state.users.data.activeUser.ui.theme || guest.ui.theme);

	const isDarkMode = useMediaMatch('(prefers-color-scheme: dark)');

	const handleSetColorMode = useCallback(
		debounce(() => {
			const mode = getMode({ colorMode: theme.colorMode, isDarkMode });

			setColorMode(mode);
			// TODO: Maybe show spinner
			// if(colorMode === 'system'){
			// 	dispatch(toggleSpinnerModal(true));
			// }
		}, 1000),
		[theme, isDarkMode]
	);

	useEffect(() => handleSetColorMode(), [isDarkMode]);
};

export default useCheckColorMode;
