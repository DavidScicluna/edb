import { useCallback, useEffect } from 'react';

import { ColorMode, useColorMode } from '@chakra-ui/react';

import { useMediaMatch } from 'rooks';
import { useDispatch } from 'react-redux';

import { guest } from '../../store/slices/Users';
import { UserTheme } from '../../store/slices/Users/types';
import { toggleSpinnerModal } from '../../store/slices/Modals';

import { useSelector } from '.';

type UseUserThemeReturn = {
	colorMode: ColorMode;
} & Pick<UserTheme, 'color'>;

const useUserTheme = (): UseUserThemeReturn => {
	const { colorMode, setColorMode } = useColorMode();

	const dispatch = useDispatch();
	const theme = useSelector((state) => state.users.data.activeUser.ui.theme || guest.ui.theme);

	const isDarkMode = useMediaMatch('(prefers-color-scheme: dark)');

	const handleSetColorMode = useCallback(() => {
		if (theme.colorMode === 'system') {
			dispatch(toggleSpinnerModal(true));

			setColorMode(isDarkMode ? 'dark' : 'light');
		} else {
			setColorMode(theme.colorMode);
		}
	}, [theme, colorMode, isDarkMode]);

	useEffect(() => handleSetColorMode(), [isDarkMode]);

	return {
		color: theme.color,
		colorMode
	};
};

export default useUserTheme;
