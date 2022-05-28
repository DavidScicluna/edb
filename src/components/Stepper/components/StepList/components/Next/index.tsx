import React, { ReactElement } from 'react';

import { useTheme, Icon } from '@davidscicluna/component-library';

import { useMediaQuery, Center } from '@chakra-ui/react';
import { merge } from 'lodash';

import { height } from '../..';
import useStyles from '../../common/styles';
import { handleReturnIcon } from '../Step/components/Icon';
import { handleReturnColor } from '../Step/components/Status';

import { NextProps } from './types';

const Next = (props: NextProps): ReactElement => {
	const theme = useTheme();
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const {
		color,
		colorMode,
		isDisabled = false,
		isLast = false,
		hasErrors = false,
		hasWarnings = false,
		hasIdle = false,
		onNext
	} = props;

	const style = useStyles(theme, { color });

	return (
		<Center
			aria-disabled={isDisabled}
			width={isSm ? '50%' : height}
			onClick={onNext ? () => onNext() : undefined}
			sx={{
				...merge(
					style.step,
					style[colorMode].idle,
					!isSm
						? {
								borderLeftWidth: '2px',
								borderLeftStyle: 'solid',
								borderLeftColor: `gray.${colorMode === 'light' ? 200 : 700}`
						  }
						: {}
				)
			}}
			_disabled={{ ...merge(style.disabled) }}
		>
			<Icon
				icon={
					isLast
						? hasErrors
							? handleReturnIcon('error')
							: hasWarnings || hasIdle
							? handleReturnIcon('warning')
							: 'check'
						: 'east'
				}
				category='outlined'
				color={
					isLast && hasErrors
						? `${handleReturnColor('error', color)}.${colorMode === 'light' ? 500 : 400}`
						: isLast && hasWarnings
						? `${handleReturnColor('warning', color)}.${colorMode === 'light' ? 500 : 400}`
						: `gray.${colorMode === 'light' ? 900 : 50}`
				}
				fontSize='3xl'
			/>
		</Center>
	);
};

export default Next;
