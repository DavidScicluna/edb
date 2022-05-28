import { ReactElement } from 'react';

import { Card, CardBody, Button } from '@davidscicluna/component-library';
import { useMediaQuery, Stack, Center, Text, ScaleFade } from '@chakra-ui/react';

import { Controller } from 'react-hook-form';
import dayjs from 'dayjs';
import compact from 'lodash/compact';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

import { defaultValues } from '../..';
import { useSelector } from '../../../../../common/hooks';
import { defaultUser, getUser } from '../../../../../store/slices/Users';
import DatePicker from '../../../../Forms/DatePicker';
import Header from '../Header';

import { DatesProps } from './types';

const minDate = new Date(1900, 1);
const maxDate = new Date(2100, 1);

const dataFormat = 'YYYY-MM-DD';
const visibleFormat = 'ddd, MMMM DD YYYY';

const Dates = ({ form, mediaType }: DatesProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	return (
		<Controller
			control={form.control}
			name='dates'
			render={({ field: { value } }) => (
				<Card isFullWidth>
					<Header
						label={mediaType === 'movie' ? 'Release Date' : 'First Air Date'}
						renderMessage={({ color, fontSize, fontWeight }) => (
							<ScaleFade
								in={
									!(isNil(value.gte) || isEmpty(value.gte)) ||
									!(isNil(value.lte) || isEmpty(value.lte))
								}
								unmountOnExit
							>
								<Text color={color} fontSize={fontSize} fontWeight={fontWeight}>
									{dayjs(value.gte).isSame(dayjs(value.lte), 'date')
										? dayjs(value.gte).format(visibleFormat)
										: compact([
												value.gte ? `From: ${dayjs(value.gte).format(visibleFormat)}` : null,
												value.lte ? `To: ${dayjs(value.lte).format(visibleFormat)}` : null
										  ]).join(' -> ')}
								</Text>
							</ScaleFade>
						)}
						renderButton={({ color, size, variant }) => (
							<Button
								color={color}
								isDisabled={isNil(value.gte) && isEmpty(value.gte)}
								onClick={() => form.setValue('dates', defaultValues.dates, { shouldDirty: true })}
								size={size}
								variant={variant}
							>
								Clear
							</Button>
						)}
					/>
					<CardBody>
						<Stack
							width='100%'
							direction={isSm ? 'column' : 'row'}
							alignItems='center'
							justifyContent='center'
							spacing={2}
						>
							<DatePicker
								renderToggleModal={({ color, onClick }) => (
									<Center width='100%'>
										<Button color={color} isFullWidth onClick={onClick} variant='outlined'>
											{value.gte ? dayjs(value.gte).format(visibleFormat) : 'Select Start Date'}
										</Button>
									</Center>
								)}
								color={color}
								minDate={minDate}
								maxDate={maxDate}
								firstDayOfWeek={1}
								onSetDate={(date) =>
									form.setValue('dates.gte', dayjs(date).format(dataFormat), {
										shouldDirty: true
									})
								}
								value={value.gte ? dayjs(value.gte, dataFormat).toDate() : undefined}
							/>

							<DatePicker
								renderToggleModal={({ color, onClick }) => (
									<Center width='100%'>
										<Button color={color} isFullWidth onClick={onClick} variant='outlined'>
											{value.lte ? dayjs(value.lte).format(visibleFormat) : 'Select To Date'}
										</Button>
									</Center>
								)}
								color={color}
								minDate={dayjs(value.gte, dataFormat).toDate() || minDate}
								maxDate={maxDate}
								firstDayOfWeek={1}
								onSetDate={(date) =>
									form.setValue(
										'dates',
										{
											gte:
												isNil(value.gte) && isEmpty(value.gte)
													? dayjs(dayjs(date).subtract(1, 'days').toDate()).format(dataFormat)
													: dayjs(value.gte).format(dataFormat),
											lte: dayjs(date).format(dataFormat)
										},
										{
											shouldDirty: true
										}
									)
								}
								value={value.lte ? dayjs(value.lte, dataFormat).toDate() : undefined}
							/>
						</Stack>
					</CardBody>
				</Card>
			)}
		/>
	);
};

export default Dates;
