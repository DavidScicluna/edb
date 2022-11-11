// import { utils } from '@davidscicluna/component-library';

import { ColorMode, useColorMode } from '@chakra-ui/react';

import { guest } from '../../store/slices/Users';
import { UserTheme } from '../../store/slices/Users/types';

import { useSelector } from '.';

type UseUserThemeReturn = {
	colorMode: ColorMode;
} & Pick<UserTheme, 'color'>;

// const { getColorMode } = utils;

const useUserTheme = (): UseUserThemeReturn => {
	const { colorMode } = useColorMode();

	const { color } = useSelector((state) => state.users.data.activeUser.ui.theme || guest.ui.theme);

	return {
		color: color,
		// colorMode: colorMode === 'system' ? getColorMode() : colorMode
		colorMode
	};
};

export default useUserTheme;
