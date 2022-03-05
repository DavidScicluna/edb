import { ReactElement } from 'react';
import { UseFormReturn, Controller } from 'react-hook-form';

import { useMediaQuery, Stack, Center, Text } from '@chakra-ui/react';

import BackgroundItem from './components/BackgroundItem';
import { Background as BackgroundType } from './types';

import { handleCheckSystemColorMode } from '../../../../../../../common/utils';
import Icon from '../../../../../../../components/Icon';
import Panel from '../../../../../../../components/Panel';
import { Form } from '../../types';

const backgrounds: BackgroundType[] = [
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

const Background = ({ form }: { form: UseFormReturn<Form> }): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const color = form.watch('color');

	return (
		<Controller
			control={form.control}
			name='background'
			render={({ field: { value } }) => (
				<Panel colorMode={value === 'system' ? handleCheckSystemColorMode() : value} isFullWidth>
					{{
						header: {
							title: 'Background'
						},
						body: (
							<Stack width='100%' direction={isSm ? 'column' : 'row'} spacing={2}>
								{backgrounds.map((background) => (
									<Center width='100%' key={background.value}>
										<BackgroundItem
											{...background}
											color={color}
											background={value === 'system' ? handleCheckSystemColorMode() : value}
											isActive={value === background.value}
											onClick={() =>
												form.setValue('background', background.value, { shouldDirty: true })
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

export default Background;
