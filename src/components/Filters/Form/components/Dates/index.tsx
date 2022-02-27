import { ReactElement } from 'react';
import { Controller } from 'react-hook-form';

import { useMediaQuery, Stack, Center, Text, ScaleFade } from '@chakra-ui/react';

import _ from 'lodash';
import moment from 'moment';

import { DatesProps } from './types';

import { defaultValues } from '../..';
import { useSelector } from '../../../../../common/hooks';
import Button from '../../../../Clickable/Button';
import DatePicker from '../../../../Forms/DatePicker';
import Panel from '../../../../Panel';
import Header from '../Header';

const minDate = new Date(1900, 1);
const maxDate = new Date(2100, 1);

const dataFormat = 'YYYY-MM-DD';
const visibleFormat = 'ddd, MMMM DD YYYY';

const Dates = ({ form, mediaType }: DatesProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const color = useSelector((state) => state.user.ui.theme.color);

	return (
		<Controller
			control={form.control}
			name='date'
			render={({ field: { value } }) => (
				<Panel isFullWidth>
					{{
						header: (
							<Header
								label={mediaType === 'movie' ? 'Release Date' : 'First Air Date'}
								renderMessage={({ color, fontSize, fontWeight }) => (
									<ScaleFade
										in={
											!_.isNil(value.gte) &&
											!_.isEmpty(value.gte) &&
											!_.isNil(value.lte) &&
											!_.isEmpty(value.lte)
										}
										unmountOnExit
									>
										<Text color={color} fontSize={fontSize} fontWeight={fontWeight}>
											{moment(value.gte).isSame(moment(value.lte), 'date')
												? moment(value.gte).format(visibleFormat)
												: [value.gte, value.lte]
														.map((date) => moment(date).format(visibleFormat))
														.join(' - ')}
										</Text>
									</ScaleFade>
								)}
								renderButton={({ color, size, variant }) => (
									<Button
										color={color}
										isDisabled={
											(!_.isNil(value.gte) && !_.isEmpty(value.gte)) ||
											(!_.isNil(value.lte) && !_.isEmpty(value.lte))
										}
										onClick={() => form.setValue('date', defaultValues.date, { shouldDirty: true })}
										size={size}
										variant={variant}
									>
										Clear
									</Button>
								)}
							/>
						),
						body: (
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
												{value.gte
													? moment(value.gte).format(visibleFormat)
													: 'Select Start Date'}
											</Button>
										</Center>
									)}
									color={color}
									minDate={minDate}
									maxDate={maxDate}
									firstDayOfWeek={1}
									value={value.gte ? moment(value.gte, dataFormat).toDate() : undefined}
									onSetDate={(date) =>
										form.setValue('date.gte', moment(date).format(dataFormat), {
											shouldDirty: true
										})
									}
								/>

								<DatePicker
									renderToggleModal={({ color, onClick }) => (
										<Center width='100%'>
											<Button color={color} isFullWidth onClick={onClick} variant='outlined'>
												{value.lte ? moment(value.lte).format(visibleFormat) : 'Select To Date'}
											</Button>
										</Center>
									)}
									color={color}
									minDate={moment(value.gte, dataFormat).toDate() || minDate}
									maxDate={maxDate}
									firstDayOfWeek={1}
									value={value.lte ? moment(value.lte, dataFormat).toDate() : undefined}
									onSetDate={(date) =>
										form.setValue(
											!_.isNil(value.gte) && !_.isEmpty(value.gte) ? 'date.lte' : 'date',
											!_.isNil(value.gte) && !_.isEmpty(value.gte)
												? moment(date).format(dataFormat)
												: {
														gte: moment(moment(value.lte).subtract(1, 'days')).format(
															dataFormat
														),
														lte: moment(date).format(dataFormat)
												  },
											{
												shouldDirty: true
											}
										)
									}
								/>
							</Stack>
						)
					}}
				</Panel>
			)}
		/>
	);
};

export default Dates;
