import React from 'react';

import { useTheme, useColorMode, Box, HStack, Center } from '@chakra-ui/react';

import { merge } from 'lodash';

import { ListsTabButtonProps } from './types';

import { useSelector } from '../../../../../../../../common/hooks';
import Icon from '../../../../../../../../components/Icon';
import {
	handleReturnSpacing,
	handleReturnIconSize
} from '../../../../../../../../components/Tabs/components/TabList/components/Tab';
import useStyles from '../../../../../../../../components/Tabs/components/TabList/components/Tab/styles';
import { Size } from '../../../../../../../../components/Tabs/components/TabList/components/Tab/types';
import { Theme } from '../../../../../../../../theme/types';

const ListsTabButton = ({ isDisabled = false, isSelected = false, onClick }: ListsTabButtonProps) => {
	const theme = useTheme<Theme>();
	const { colorMode } = useColorMode();

	const color = useSelector((state) => state.user.ui.theme.color);

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
				<Icon icon='grid_on' type={isSelected ? 'filled' : 'outlined'} fontSize={iconSize} />
				<Center>Lists</Center>
			</HStack>
		</Box>
	);
};

export default ListsTabButton;
