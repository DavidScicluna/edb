import { useTheme, Icon } from '@davidscicluna/component-library';

import { useColorMode, Box, HStack, Center } from '@chakra-ui/react';

import merge from 'lodash/merge';

import { useSelector } from '../../../../../../../../common/hooks';
import {
	handleReturnSpacing,
	handleReturnIconSize
} from '../../../../../../../../components/Tabs/components/TabList/components/Tab';
import useStyles from '../../../../../../../../components/Tabs/components/TabList/components/Tab/styles';
import { Size } from '../../../../../../../../components/Tabs/components/TabList/components/Tab/types';
import { defaultUser, getUser } from '../../../../../../../../store/slices/Users';

import { ListsTabButtonProps } from './types';

const ListsTabButton = ({ isDisabled = false, isSelected = false, onClick }: ListsTabButtonProps) => {
	const theme = useTheme();
	const { colorMode } = useColorMode();

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const size: Size = 'lg';
	const style = useStyles(theme, { color, isFullWidth: false, isOnlyTab: false, isSelected, size });

	const iconSize = `${handleReturnIconSize(size, theme)}px`;

	return (
		<Box
			aria-disabled={isDisabled}
			onClick={!isSelected ? () => onClick() : undefined}
			sx={{ ...merge(style.tab.default, style.tab[size], style[colorMode]) }}
			_disabled={{ ...merge(style.disabled) }}
		>
			<HStack width='100%' alignItems='inherit' justifyContent='inherit' spacing={handleReturnSpacing(size)}>
				<Icon icon='grid_on' category={isSelected ? 'filled' : 'outlined'} fontSize={iconSize} />
				<Center>Lists</Center>
			</HStack>
		</Box>
	);
};

export default ListsTabButton;
