import { FC } from 'react';

import { Card, CardHeader, CardBody, utils } from '@davidscicluna/component-library';

import { SimpleGrid, Text } from '@chakra-ui/react';

import { Controller } from 'react-hook-form';
import { capitalize, startCase } from 'lodash';

import { UserThemeCustomizationProps as ColorProps } from '../../types';
import { UserThemeColor } from '../../../../../store/slices/Users/types';
import { colorMode as defaultColorMode } from '../../../../../common/data/defaultPropValues';

import ColorItem from './components/ColorItem';

const colors: UserThemeColor[] = [
	'pink',
	'purple',
	'deep_purple',
	'indigo',
	'blue',
	'light_blue',
	'cyan',
	'teal',
	'light_green',
	'lime',
	'orange',
	'deep_orange'
];

const { getColorMode } = utils;

const Color: FC<ColorProps> = (props) => {
	const { form, colorMode = defaultColorMode } = props;
	const { control, setValue } = form;

	return (
		<Controller
			control={control}
			name='color'
			render={({ field: { onBlur, value, name, ref } }) => (
				<Card
					ref={ref}
					colorMode={colorMode === 'system' ? getColorMode() : colorMode}
					isFullWidth
					onBlur={onBlur}
					p={2}
				>
					<CardHeader renderTitle={(props) => <Text {...props}>Color</Text>} />
					<CardBody>
						<SimpleGrid width='100%' columns={[1, 3]} spacing={2}>
							{colors.map((color) => (
								<ColorItem
									key={color}
									color={color}
									colorMode={colorMode}
									label={startCase(capitalize(color))}
									isActive={color === value}
									onClick={() => setValue(name, color, { shouldDirty: true })}
								/>
							))}
						</SimpleGrid>
					</CardBody>
				</Card>
			)}
		/>
	);
};

export default Color;
