import React, { ReactElement } from 'react';

import { useTheme, useMediaQuery, Center } from '@chakra-ui/react';

import { merge } from 'lodash';

import { NextProps } from './types';

import { height } from '../..';
import { Theme } from '../../../../../../theme/types';
import Icon from '../../../../../Icon';
import useStyles from '../../common/styles';

const border = {
	borderLeftWidth: '2px',
	borderLeftStyle: 'solid',
	borderLeftColor: 'gray.200'
};

const Next = (props: NextProps): ReactElement => {
	const theme = useTheme<Theme>();
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const { color, colorMode, isDisabled = false, isLast = false, onNext } = props;

	const style = useStyles(theme, { color });

	return (
		<Center
			aria-disabled={isDisabled}
			width={isSm ? '50%' : height}
			onClick={onNext ? () => onNext() : undefined}
			sx={{ ...merge(style.step, style[colorMode].idle, border) }}
			_disabled={{ ...merge(style.disabled) }}
		>
			<Icon
				icon={isLast ? 'check' : 'east'}
				type='outlined'
				color={`gray.${colorMode === 'light' ? 900 : 50}`}
				fontSize='3xl'
			/>
		</Center>
	);
};

export default Next;
