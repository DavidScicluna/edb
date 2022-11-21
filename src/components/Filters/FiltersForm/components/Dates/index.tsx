import { FC } from 'react';

import { useTheme, Card, CardBody, DatePicker, Button } from '@davidscicluna/component-library';

import { useMediaQuery, Stack, Text } from '@chakra-ui/react';

import { Controller } from 'react-hook-form';
import dayjs from 'dayjs';
import { compact } from 'lodash';

import defaultValues from '../../../common/data/defaults';
import { useUserTheme } from '../../../../../common/hooks';
import FiltersFormCardHeader from '../FiltersFormCardHeaders';
import { data as dataFormat, visible as visibleFormat } from '../../../common/data/formats';

import { DatesProps } from './types';

const minDate = new Date(1900, 1);
const maxDate = new Date(2100, 1);

const Dates: FC<DatesProps> = ({ form, mediaType }) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const { control, setValue } = form;

	return (
		<Controller
			control={control}
			name='dates'
			render={({ field: { onBlur, value: dates, name } }) => (
				<Card colorMode={colorMode} isFullWidth onBlur={onBlur} p={2}>
					{/* TODO: Go over all setValues and place name from Controller instead of hardcoded string */}
					<FiltersFormCardHeader
						title={mediaType === 'movie' ? 'Release Date' : 'First Air Date'}
						subtitle=''
						renderMessage={(props) => (
							<Text {...props}>
								{dayjs(dates.gte).isSame(dayjs(dates.lte), 'date')
									? dayjs(dates.gte).format(visibleFormat)
									: compact([
											dates.gte ? `From: ${dayjs(dates.gte).format(visibleFormat)}` : null,
											dates.lte ? `To: ${dayjs(dates.lte).format(visibleFormat)}` : null
									  ]).join(' -> ')}
							</Text>
						)}
						renderButton={(props) => (
							<Button
								{...props}
								isDisabled={!dates.gte && !dates.lte}
								onClick={() => setValue(name, defaultValues.dates, { shouldDirty: true })}
							>
								Clear
							</Button>
						)}
						isMessageVisible={!!dates.gte || !!dates.lte}
					/>

					<CardBody>
						<Stack
							width='100%'
							direction={isSm ? 'column' : 'row'}
							alignItems='center'
							justifyContent='center'
							spacing={2}
						>
							<Controller
								control={control}
								name='dates.gte'
								render={({ field: { value, name } }) => (
									<DatePicker
										color={color}
										colorMode={colorMode}
										renderButton={(props) => (
											<Button {...props} isFullWidth variant='outlined'>
												{value ? dayjs(value).format(visibleFormat) : 'Select From Date'}
											</Button>
										)}
										minDate={minDate}
										maxDate={maxDate}
										monthsToDisplay={1}
										firstDayOfWeek={1}
										onSetDate={(date) =>
											setValue(name, dayjs(date).format(dataFormat), {
												shouldDirty: true
											})
										}
										value={value ? dayjs(value, dataFormat).toDate() : undefined}
									/>
								)}
							/>

							<Controller
								control={control}
								name='dates.lte'
								render={({ field: { value, name } }) => (
									<DatePicker
										color={color}
										colorMode={colorMode}
										renderButton={(props) => (
											<Button {...props} isFullWidth variant='outlined'>
												{value ? dayjs(value).format(visibleFormat) : 'Select To Date'}
											</Button>
										)}
										minDate={dates.gte ? dayjs(dates.gte, dataFormat).toDate() : minDate}
										maxDate={maxDate}
										monthsToDisplay={1}
										firstDayOfWeek={1}
										onSetDate={(date) => {
											setValue(name, dayjs(date).format(dataFormat), { shouldDirty: true });

											if (!dates.gte) {
												setValue(
													'dates.gte',
													dayjs(dayjs(date).subtract(1, 'days').toDate()).format(dataFormat),
													{ shouldDirty: true }
												);
											}
										}}
										value={value ? dayjs(value, dataFormat).toDate() : undefined}
									/>
								)}
							/>
						</Stack>
					</CardBody>
				</Card>
			)}
		/>
	);
};

export default Dates;
