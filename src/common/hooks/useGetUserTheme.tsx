import { guest } from '../../store/slices/Users';
import { UserTheme } from '../../store/slices/Users/types';

import { useSelector } from '.';

const useGetUserTheme = (): UserTheme => {
	return useSelector((state) => state.users.data.activeUser.ui.theme || guest.ui.theme);
};

export default useGetUserTheme;
