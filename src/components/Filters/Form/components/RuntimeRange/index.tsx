import { ReactElement } from 'react';

import { Card, CardBody, ButtonGroup, Button } from '@davidscicluna/component-library';

import { useTheme, useMediaQuery, useConst, Text, ScaleFade } from '@chakra-ui/react';
import { Controller } from 'react-hook-form';
import compact from 'lodash/compact';
import range from 'lodash/range';

import { defaultValues } from '../..';
import { useSelector } from '../../../../../common/hooks';
import { defaultUser, getUser } from '../../../../../store/slices/Users';
import { Filters } from '../../../types';
import { handleCheckIfInRange } from '../../common/utils';
import Header from '../Header';

import { RuntimeRangeProps } from './types';

const RuntimeRange = ({ form }: RuntimeRangeProps): ReactElement => {
	const theme = useTheme();
	const [isMd] = useMediaQuery('(max-width: 760px)');

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const runtimes = useConst(range(0, 475, 45));

	const handleOnChange = (value: Filters['runtime'], number: number): void => {
		const runtimes = compact(value);

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
				const value = compact(field.value);

				return (
					<Card isFullWidth>
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
						<CardBody>
							<ButtonGroup isAttached sx={{ width: '100%', flexWrap: isMd ? 'wrap' : 'nowrap' }}>
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
												px: 0.5,
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
						</CardBody>
					</Card>
				);
			}}
		/>
	);
};

export default RuntimeRange;
