import { ReactElement } from 'react';

import { useTheme, useColorMode, Center } from '@chakra-ui/react';

import { merge } from 'lodash';

import useStyles from './styles';
import { Size } from './types';

import { useSelector } from '../../../../common/hooks';
import { defaultUser, getUser } from '../../../../store/slices/Users';
import { Theme } from '../../../../theme/types';

const Logo = ({ size = 'md' }: { size?: Size }): ReactElement => {
	const theme = useTheme<Theme>();
	const { colorMode } = useColorMode();

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const style = useStyles(theme, color, size);

	return <Center sx={{ ...merge(style.common, style[colorMode]) }}>edb</Center>;
};

export default Logo;
