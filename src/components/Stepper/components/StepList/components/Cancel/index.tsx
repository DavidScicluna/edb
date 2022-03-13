import React, { ReactElement } from 'react';

import { useTheme, useMediaQuery, Center } from '@chakra-ui/react';

import { merge } from 'lodash';

import { CancelProps } from './types';

import { height } from '../..';
import { Theme } from '../../../../../../theme/types';
import Icon from '../../../../../Icon';
import useStyles from '../../common/styles';

const border = {
	borderRightWidth: '2px',
	borderRightStyle: 'solid',
	borderRightColor: 'gray.200'
};

const Cancel = (props: CancelProps): ReactElement => {
	const theme = useTheme<Theme>();
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const { color, colorMode, isDisabled = false, onCancel } = props;

	const style = useStyles(theme, { color });

	return (
		<Center
			aria-disabled={isDisabled}
			width={isSm ? '50%' : height}
			onClick={onCancel ? () => onCancel() : undefined}
			sx={{ ...merge(style.step, style[colorMode].idle, !isSm ? border : {}) }}
			_disabled={{ ...merge(style.disabled) }}
		>
			<Icon icon='close' type='outlined' color={`gray.${colorMode === 'light' ? 900 : 50}`} fontSize='3xl' />
		</Center>
	);
};

export default Cancel;
