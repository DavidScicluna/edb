import { ColorMode, useColorMode } from '@chakra-ui/react';

// import { useDispatch } from 'react-redux';

import { guest } from '../../store/slices/Users';
import { UserTheme } from '../../store/slices/Users/types';
// import { toggleSpinnerModal } from '../../store/slices/Modals';

import { useSelector } from '.';

type UseUserThemeReturn = {
	colorMode: ColorMode;
} & Pick<UserTheme, 'color'>;

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
