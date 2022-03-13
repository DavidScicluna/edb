import React, { ReactElement } from 'react';

import { Text } from '@chakra-ui/react';

import { StatusProps } from './types';

import { Color } from '../../../../../../../../theme/types';

export const handleReturnColor = (status: StatusProps['status'], color: StatusProps['color']): keyof Color => {
	switch (status) {
		case 'success':
			return 'green';
		case 'error':
			return 'red';
		case 'active':
			return color;
		case 'warning':
			return 'yellow';
		default:
			return 'gray';
	}
};

const Status = ({ color, colorMode, status }: StatusProps): ReactElement => {
	const handleReturnLabel = (): string => {
		switch (status) {
			case 'success':
				return 'complete';
			case 'error':
				return 'error';
			case 'active':
				return 'current';
			case 'warning':
				return 'incomplete';
			default:
				return 'not done yet';
		}
	};

	return (
		<Text
			align='left'
			color={`${handleReturnColor(status, color)}.${colorMode === 'light' ? 500 : 400}`}
			fontSize='xs'
			fontWeight='semibold'
			lineHeight='normal'
			textTransform='uppercase'
			isTruncated
			overflow='hidden'
			whiteSpace='nowrap'
		>
			{handleReturnLabel()}
		</Text>
	);
};

export default Status;
