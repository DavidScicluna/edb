import { FC } from 'react';

import { Card, CardHeader, CardBody, utils } from '@davidscicluna/component-library';

import { useMediaQuery, Stack, Text } from '@chakra-ui/react';

import { Controller } from 'react-hook-form';

import { color as defaultColor, colorMode as defaultColorMode } from '../../../../../common/data/defaultPropValues';
import { UserThemeCustomizationProps as ColorModeProps } from '../../types';

import ColorModeItem from './components/ColorModeItem';

const { getColorMode } = utils;

const ColorMode: FC<ColorModeProps> = ({ form, color = defaultColor, colorMode = defaultColorMode }) => {
	const [isXs] = useMediaQuery('(max-width: 600px)');

	return (
		<Controller
			control={form.control}
			name='colorMode'
			render={({ field: { onBlur, value, name, ref } }) => (
				<Card
					ref={ref}
					colorMode={colorMode === 'system' ? getColorMode() : colorMode}
					isFullWidth
					onBlur={onBlur}
					p={2}
				>
					<CardHeader renderTitle={(props) => <Text {...props}>Appearance</Text>} />
					<CardBody>
						<Stack width='100%' direction={isXs ? 'column' : 'row'} spacing={2}>
							{/* Light */}
							<ColorModeItem
								color={color}
								colorMode={colorMode}
								label='Light'
								value='light'
								isActive={value === 'light'}
								onClick={() => form.setValue(name, 'light', { shouldDirty: true })}
							/>

							{/* System */}
							<ColorModeItem
								color={color}
								colorMode={colorMode}
								label='System'
								value='system'
								isActive={value === 'system'}
								onClick={() => form.setValue(name, 'system', { shouldDirty: true })}
							/>

							{/* Dark */}
							<ColorModeItem
								color={color}
								colorMode={colorMode}
								label='Dark'
								value='dark'
								isActive={value === 'dark'}
								onClick={() => form.setValue(name, 'dark', { shouldDirty: true })}
							/>
						</Stack>
					</CardBody>
				</Card>
			)}
		/>
	);
};

export default ColorMode;
