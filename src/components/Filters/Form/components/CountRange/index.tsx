import { ReactElement } from 'react';


import { useTheme, useMediaQuery, useConst, ButtonGroup, Text, ScaleFade } from '@chakra-ui/react';

import { Controller } from 'react-hook-form';
import compact from 'lodash/compact';
import range from 'lodash/range';


import { defaultValues } from '../..';
import { useSelector } from '../../../../../common/hooks';
import { defaultUser, getUser } from '../../../../../store/slices/Users';
import { Theme } from '../../../../../theme/types';
import Button from '../../../../Clickable/Button';
import Panel from '../../../../Panel';
import { Filters } from '../../../types';
import { handleCheckIfInRange } from '../../common/utils';
import Header from '../Header';

import { CountRangeProps } from './types';

const CountRange = ({ form }: CountRangeProps): ReactElement => {
	const theme = useTheme<Theme>();
	const [isMd] = useMediaQuery('(max-width: 760px)');

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const counts = useConst(range(0, 550, 50));

	const handleOnChange = (value: Filters['count'], number: number): void => {
		const count = compact(value);

		if (count.some((num) => num === number)) {
			form.setValue(
				'count',
				[...count].filter((num) => num !== number).sort((a, b) => a - b),
				{ shouldDirty: true }
			);
		} else {
			form.setValue(
				'count',
				count.length > 1
					? [...count, number].filter((_num, index) => index !== 0).sort((a, b) => a - b)
					: [...count, number].sort((a, b) => a - b),
				{
					shouldDirty: true
				}
			);
		}
	};

	return (
		<Controller
			control={form.control}
			name='count'
			render={({ field }) => {
				const value = compact(field.value);

				return (
					<Panel isFullWidth>
						{{
							header: (
								<Header
									label='Number of Ratings Range'
									renderMessage={({ color, fontSize, fontWeight }) => (
										<ScaleFade in={value.length > 0} unmountOnExit>
											<Text color={color} fontSize={fontSize} fontWeight={fontWeight}>
												{value.map((count) => `${count} ratings`).join(' -> ')}
											</Text>
										</ScaleFade>
									)}
									renderButton={({ color, size, variant }) => (
										<Button
											color={color}
											isDisabled={value.length === 0}
											onClick={() =>
												form.setValue('count', defaultValues.count, { shouldDirty: true })
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
									{counts.map((number) => (
										<Button
											key={number}
											color={
												value.some((count) => count === number) ||
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
														number === counts[0]
															? `${theme.radii.base} 0 0 ${theme.radii.base}`
															: number === counts[counts.length - 1]
															? `0 ${theme.radii.base} ${theme.radii.base} 0`
															: 0
												},
												front: {
													px: 0.5,
													borderRadius:
														number === counts[0]
															? `${theme.radii.base} 0 0 ${theme.radii.base}`
															: number === counts[counts.length - 1]
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

export default CountRange;
