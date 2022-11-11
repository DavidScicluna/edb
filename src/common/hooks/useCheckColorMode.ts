import { useCallback, useEffect } from 'react';

import { ColorMode, useColorMode } from '@chakra-ui/react';

import { useMediaMatch } from 'rooks';
import { debounce, memoize } from 'lodash';
import { useDispatch } from 'react-redux';
import { useUpdateEffect } from 'usehooks-ts';

import { guest } from '../../store/slices/Users';
import { UserThemeColorMode } from '../../store/slices/Users/types';
import { toggleSpinnerModal } from '../../store/slices/Modals';

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
	const { colorMode: colorModeHook, setColorMode } = useColorMode();

	const dispatch = useDispatch();
	const colorMode = useSelector(
		(state) => state.users.data.activeUser.ui.theme.colorMode || guest.ui.theme.colorMode
	);

	const isDarkMode = useMediaMatch('(prefers-color-scheme: dark)');

	const handleSetColorMode = useCallback(
		debounce(() => {
			const mode = getMode({ colorMode, isDarkMode });

			// if (colorMode === 'system' && mode !== colorModeHook) {
			// 	dispatch(toggleSpinnerModal(true));

			// 	setTimeout(() => dispatch(toggleSpinnerModal(false)), 2500);
			// }

			setTimeout(() => setColorMode(mode), 250);
		}, 1000),
		[colorMode, isDarkMode]
	);

	useEffect(() => handleSetColorMode(), [isDarkMode]);

	useUpdateEffect(() => handleSetColorMode(), [colorModeHook]);
};

export default useCheckColorMode;
