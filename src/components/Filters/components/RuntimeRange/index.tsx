import { ReactElement } from 'react';
import { Controller } from 'react-hook-form';

import { useTheme, useMediaQuery, useConst, ButtonGroup, Text, ScaleFade } from '@chakra-ui/react';

import _ from 'lodash';

import { RuntimeRangeProps } from './types';

import { defaultValues } from '../..';
import { useSelector } from '../../../../common/hooks';
import { Theme } from '../../../../theme/types';
import Button from '../../../Clickable/Button';
import Panel from '../../../Panel';
import { handleCheckIfInRange } from '../../common/utils';
import { Form } from '../../types';
import Header from '../Header';

const RuntimeRange = ({ form }: RuntimeRangeProps): ReactElement => {
	const theme = useTheme<Theme>();
	const [isMd] = useMediaQuery('(max-width: 760px)');

	const color = useSelector((state) => state.user.ui.theme.color);

	const runtimes = useConst(_.range(0, 475, 45));

	const handleOnChange = (value: Form['runtime'], number: number): void => {
		const runtimes = _.compact(value);

		if (runtimes.some((num) => num === number)) {
			form.setValue(
				'runtime',
				[...runtimes].filter((num) => num !== number).sort((a, b) => a - b),
				{ shouldDirty: true }
			);
		} else {
			form.setValue(
				'runtime',
				runtimes.length > 1
					? [...runtimes, number].filter((_num, index) => index !== 0).sort((a, b) => a - b)
					: [...runtimes, number].sort((a, b) => a - b),
				{
					shouldDirty: true
				}
			);
		}
	};

	return (
		<Controller
			control={form.control}
			name='runtime'
			render={({ field }) => {
				const value = _.compact(field.value);

				return (
					<Panel isFullWidth>
						{{
							header: (
								<Header
									label='Runtime Range'
									renderMessage={({ color, fontSize, fontWeight }) => (
										<ScaleFade in={value.length > 0} unmountOnExit>
											<Text color={color} fontSize={fontSize} fontWeight={fontWeight}>
												{value.map((runtime) => `${runtime} minutes`).join(' -> ')}
											</Text>
										</ScaleFade>
									)}
									renderButton={({ color, size, variant }) => (
										<Button
											color={color}
											isDisabled={value.length === 0}
											onClick={() =>
												form.setValue('runtime', defaultValues.runtime, { shouldDirty: true })
											}
											size={size}
											variant={variant}
										>
											Clear
										</Button>
									)}
								/>
							),
							body: (
								<ButtonGroup width='100%' isAttached flexWrap={isMd ? 'wrap' : 'nowrap'}>
									{runtimes.map((number) => (
										<Button
											key={number}
											color={
												value.some((runtime) => runtime === number) ||
												handleCheckIfInRange(number, value)
													? color
													: 'gray'
											}
											isFullWidth
											onClick={() => handleOnChange(value, number)}
											variant={value.some((count) => count === number) ? 'contained' : 'outlined'}
											sx={{
												back: {
													flex: isMd ? 1 : '',
													minWidth: isMd ? `${100 / 6}%` : 'auto',
													borderRadius:
														number === runtimes[0]
															? `${theme.radii.base} 0 0 ${theme.radii.base}`
															: number === runtimes[runtimes.length - 1]
															? `0 ${theme.radii.base} ${theme.radii.base} 0`
															: 0
												},
												front: {
													borderRadius:
														number === runtimes[0]
															? `${theme.radii.base} 0 0 ${theme.radii.base}`
															: number === runtimes[runtimes.length - 1]
															? `0 ${theme.radii.base} ${theme.radii.base} 0`
															: 0
												}
											}}
										>
											{String(number)}
										</Button>
									))}
								</ButtonGroup>
							)
						}}
					</Panel>
				);
			}}
		/>
	);
};

export default RuntimeRange;
