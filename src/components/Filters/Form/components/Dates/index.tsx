import { ReactElement } from 'react';
import { Controller } from 'react-hook-form';

import { useMediaQuery, Stack, Center, Text, ScaleFade } from '@chakra-ui/react';

import { isNil, isEmpty, compact } from 'lodash';
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
			name='dates'
			render={({ field: { value } }) => (
				<Panel isFullWidth>
					{{
						header: (
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
											{moment(value.gte).isSame(moment(value.lte), 'date')
												? moment(value.gte).format(visibleFormat)
												: compact([
														value.gte
															? `From: ${moment(value.gte).format(visibleFormat)}`
															: null,
														value.lte
															? `To: ${moment(value.lte).format(visibleFormat)}`
															: null
												  ]).join(' -> ')}
										</Text>
									</ScaleFade>
								)}
								renderButton={({ color, size, variant }) => (
									<Button
										color={color}
										isDisabled={isNil(value.gte) && isEmpty(value.gte)}
										onClick={() =>
											form.setValue('dates', defaultValues.dates, { shouldDirty: true })
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
									onSetDate={(date) =>
										form.setValue('dates.gte', moment(date).format(dataFormat), {
											shouldDirty: true
										})
									}
									value={value.gte ? moment(value.gte, dataFormat).toDate() : undefined}
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
									onSetDate={(date) =>
										form.setValue(
											'dates',
											{
												gte:
													isNil(value.gte) && isEmpty(value.gte)
														? moment(moment(date).subtract(1, 'days').toDate()).format(
																dataFormat
														  )
														: moment(value.gte).format(dataFormat),
												lte: moment(date).format(dataFormat)
											},
											{
												shouldDirty: true
											}
										)
									}
									value={value.lte ? moment(value.lte, dataFormat).toDate() : undefined}
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
