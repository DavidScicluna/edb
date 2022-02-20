import { ReactElement } from 'react';
import { UseFormReturn, Controller } from 'react-hook-form';

import { ColorMode, SimpleGrid } from '@chakra-ui/react';

import ColorItem from './components/ColorItem';

import { handleCheckSystemColorMode } from '../../../../../../../common/utils';
import Panel from '../../../../../../../components/Panel';
import { Form } from '../../types';

const colors: Form['color'][] = [
	'pink',
	'purple',
	'deep_purple',
	'indigo',
	'blue',
	'light_blue',
	'cyan',
	'teal',
	'green',
	'light_green',
	'lime',
	'yellow',
	'orange',
	'deep_orange',
	'brown'
];

const Color = ({ form }: { form: UseFormReturn<Form> }): ReactElement => {
	const background = form.watch('background');
	const colorMode: ColorMode = background === 'system' ? handleCheckSystemColorMode() : background;

	return (
		<Controller
			control={form.control}
			name='color'
			render={({ field: { value } }) => (
				<Panel colorMode={colorMode} isFullWidth>
					{{
						header: {
							title: 'Color'
						},
						body: (
							<SimpleGrid width='100%' columns={[1, 3, 5]} spacing={2}>
								{colors.map((color, index) => (
									<ColorItem
										key={index}
										color={color}
										colorMode={colorMode}
										isActive={color === value}
										onClick={() => form.setValue('color', color, { shouldDirty: true })}
									/>
								))}
							</SimpleGrid>
						)
					}}
				</Panel>
			)}
		/>
	);
};

export default Color;
