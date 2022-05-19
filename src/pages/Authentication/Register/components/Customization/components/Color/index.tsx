import { ReactElement } from 'react';


import { ColorMode, SimpleGrid } from '@chakra-ui/react';

import { Controller } from 'react-hook-form';


import { handleCheckSystemColorMode } from '../../../../../../../common/utils';
import Panel from '../../../../../../../components/Panel';
import { Form } from '../../../../../../../containers/Layout/components/Modals/Display/types';
import { CustomizationProps as ColorProps } from '../../types';

import ColorItem from './components/ColorItem';

const colors: Form['color'][] = [
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

const Color = ({ form }: ColorProps): ReactElement => {
	const formColorMode = form.watch('colorMode');
	const colorMode: ColorMode = formColorMode === 'system' ? handleCheckSystemColorMode() : formColorMode;

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
							<SimpleGrid width='100%' columns={[1, 3, 4]} spacing={2}>
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
