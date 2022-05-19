import { ReactElement } from 'react';


import { useMediaQuery, Stack, Center, Text } from '@chakra-ui/react';

import { Controller } from 'react-hook-form';


import { handleCheckSystemColorMode } from '../../../../../../../common/utils';
import Icon from '../../../../../../../components/Icon';
import Panel from '../../../../../../../components/Panel';
import { CustomizationProps as ColorModeProps } from '../../types';

import { ColorMode as ColorModeType } from './types';
import ColorModeItem from './components/ColorModeItem';

const colorModes: ColorModeType[] = [
	{
		label: 'Light',
		value: 'light',
		renderLeft: ({ isActive, fontSize }) => (
			<Icon icon='light_mode' type={isActive ? 'filled' : 'outlined'} fontSize={fontSize} />
		)
	},
	{
		label: 'System',
		value: 'system',
		renderLeft: ({ isActive, fontSize }) => (
			<Center>
				<Icon icon='light_mode' type={isActive ? 'filled' : 'outlined'} fontSize={fontSize} />
				<Text align='center' fontSize='xl' mx={0.5}>
					/
				</Text>
				<Icon icon='dark_mode' type={isActive ? 'filled' : 'outlined'} fontSize={fontSize} />
			</Center>
		)
	},
	{
		label: 'Dark',
		value: 'dark',
		renderLeft: ({ isActive, fontSize }) => (
			<Icon icon='dark_mode' type={isActive ? 'filled' : 'outlined'} fontSize={fontSize} />
		)
	}
];

const ColorMode = ({ form }: ColorModeProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const color = form.watch('color');

	return (
		<Controller
			control={form.control}
			name='colorMode'
			render={({ field: { value } }) => (
				<Panel colorMode={value === 'system' ? handleCheckSystemColorMode() : value} isFullWidth>
					{{
						header: {
							title: 'Color-Mode'
						},
						body: (
							<Stack width='100%' direction={isSm ? 'column' : 'row'} spacing={2}>
								{colorModes.map((colormode) => (
									<Center width='100%' key={colormode.value}>
										<ColorModeItem
											{...colormode}
											color={color}
											colorMode={value === 'system' ? handleCheckSystemColorMode() : value}
											isActive={value === colormode.value}
											onClick={() =>
												form.setValue('colorMode', colormode.value, { shouldDirty: true })
											}
										/>
									</Center>
								))}
							</Stack>
						)
					}}
				</Panel>
			)}
		/>
	);
};

export default ColorMode;
