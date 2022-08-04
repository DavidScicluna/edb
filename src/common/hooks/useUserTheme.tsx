import { ColorMode, useColorMode } from '@chakra-ui/react';

// import { useDispatch } from 'react-redux';
import { memoize } from 'lodash';

import { guest } from '../../store/slices/Users';
import { UserTheme, UserThemeColorMode } from '../../store/slices/Users/types';
// import { toggleSpinnerModal } from '../../store/slices/Modals';

import { useSelector } from '.';

type GetModeProps = {
	colorMode: UserThemeColorMode;
	isDarkMode: boolean;
};

type UseUserThemeReturn = {
	colorMode: ColorMode;
} & Pick<UserTheme, 'color'>;

export const getMode = memoize(({ colorMode, isDarkMode = false }: GetModeProps): ColorMode => {
	if (colorMode === 'system') {
		return isDarkMode ? 'dark' : 'light';
	} else {
		return colorMode;
	}
});

const useUserTheme = (): UseUserThemeReturn => {
	const { colorMode } = useColorMode();

	// const dispatch = useDispatch();
	const theme = useSelector((state) => state.users.data.activeUser.ui.theme || guest.ui.theme);

	return {
		color: theme.color,
		colorMode
	};
};

export default useUserTheme;
