import { ReactElement } from 'react';

import { useTheme } from '@davidscicluna/component-library';

import { ColorMode, useColorMode, Box } from '@chakra-ui/react';
import merge from 'lodash/merge';

import { DividerProps } from './types';

const Divider = (props: DividerProps): ReactElement => {
	const theme = useTheme();
	const { colorMode: colorModeHook } = useColorMode();

	const { colorMode: colorModeProp, orientation = 'horizontal', sx, ...rest } = props;

	const colorMode: ColorMode = colorModeProp || colorModeHook;

	return (
		<Box
			width={orientation === 'horizontal' ? '100%' : '2px'}
			height={orientation === 'horizontal' ? '2px' : '100%'}
			backgroundColor={`gray.${colorMode === 'light' ? 200 : 700}`}
			{...rest}
			border='none'
			sx={{
				...merge(
					{
						transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']} !important`
					},
					sx
				)
			}}
		/>
	);
};

export default Divider;
