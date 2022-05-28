import React, { ReactElement } from 'react';

import { useTheme, Icon } from '@davidscicluna/component-library';

import { useMediaQuery, Center } from '@chakra-ui/react';

import { merge } from 'lodash';

import { height } from '../..';
import useStyles from '../../common/styles';

import { CancelProps } from './types';

const Cancel = (props: CancelProps): ReactElement => {
	const theme = useTheme();
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const { color, colorMode, isDisabled = false, onCancel } = props;

	const style = useStyles(theme, { color });

	return (
		<Center
			aria-disabled={isDisabled}
			width={isSm ? '50%' : height}
			onClick={onCancel ? () => onCancel() : undefined}
			sx={{
				...merge(
					style.step,
					style[colorMode].idle,
					!isSm
						? {
								borderRightWidth: '2px',
								borderRightStyle: 'solid',
								borderRightColor: `gray.${colorMode === 'light' ? 200 : 700}`
						  }
						: {}
				)
			}}
			_disabled={{ ...merge(style.disabled) }}
		>
			<Icon icon='close' category='outlined' color={`gray.${colorMode === 'light' ? 900 : 50}`} fontSize='3xl' />
		</Center>
	);
};

export default Cancel;
