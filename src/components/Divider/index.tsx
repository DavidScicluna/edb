import { ReactElement } from 'react';

import { ColorMode, useTheme, useColorMode, Box } from '@chakra-ui/react';

import _ from 'lodash';

import { DividerProps } from './types';

import { Theme } from '../../theme/types';

const Divider = (props: DividerProps): ReactElement => {
	const theme = useTheme<Theme>();
	const { colorMode: colorModeHook } = useColorMode();

	const { colorMode: colorModeProp, orientation = 'horizontal', sx, ...rest } = props;

	const colorMode: ColorMode = colorModeProp || colorModeHook;

	return (
		<Box
			width={orientation === 'horizontal' ? '100%' : '2px'}
			height={orientation === 'horizontal' ? '2px' : '100%'}
			backgroundColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
			{...rest}
			border='none'
			sx={{
				..._.merge(
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