import React, { ReactElement, forwardRef } from 'react';

import { Center } from '@chakra-ui/react';

import { StepIconRef, StepIconProps } from './types';

import Icon from '../../../../../../../Icon';
import { Icon as IconType } from '../../../../../../../Icon/types';
import { handleReturnColor } from '../Status';

const StepIcon = forwardRef<StepIconRef, StepIconProps>(function StepIcon(props, ref): ReactElement {
	const { color, colorMode, status } = props;

	const handleReturnIcon = (): IconType => {
		switch (status) {
			case 'error':
				return 'error_outline';
			case 'warning':
				return 'warning_amber';
			default:
				return 'done';
		}
	};

	return (
		<Center height='100%'>
			<Icon
				ref={ref}
				icon={handleReturnIcon()}
				type='outlined'
				color={`${handleReturnColor(status, color)}.${colorMode === 'light' ? 500 : 400}`}
				fontSize='3xl'
			/>
		</Center>
	);
});

export default StepIcon;
