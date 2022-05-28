import React, { ReactElement, forwardRef } from 'react';

import { Icon, IconType } from '@davidscicluna/component-library';

import { Center } from '@chakra-ui/react';

import { Status } from '../../types';
import { handleReturnColor } from '../Status';

import { StepIconRef, StepIconProps } from './types';

export const handleReturnIcon = (status: Status): IconType => {
	switch (status) {
		case 'error':
			return 'error_outline';
		case 'warning':
			return 'warning_amber';
		default:
			return 'done';
	}
};

const StepIcon = forwardRef<StepIconRef, StepIconProps>(function StepIcon(props, ref): ReactElement {
	const { color, colorMode, status } = props;

	return (
		<Center ref={ref} height='100%'>
			<Icon
				icon={handleReturnIcon(status)}
				category='outlined'
				color={`${handleReturnColor(status, color)}.${colorMode === 'light' ? 500 : 400}`}
				fontSize='3xl'
			/>
		</Center>
	);
});

export default StepIcon;
