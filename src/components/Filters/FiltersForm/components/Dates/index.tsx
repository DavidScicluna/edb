import { FC } from 'react';

import { useTheme, Card, CardBody, DatePicker, Button, SlideFade } from '@davidscicluna/component-library';

import { useMediaQuery, Stack, Text } from '@chakra-ui/react';

import { Controller, useWatch } from 'react-hook-form';
import dayjs from 'dayjs';
import { compact, round } from 'lodash';

import defaultValues from '../../../common/data/defaults';
import { useUserTheme } from '../../../../../common/hooks';
import FiltersFormCardHeader from '../FiltersFormCardHeaders';
import { getFontSizeHeight } from '../../../../../common/utils';
import { data as dataFormat, visible as visibleFormat } from '../../../common/data/formats';

import { DatesProps } from './types';

const minDate = new Date(1900, 1);
const maxDate = new Date(2100, 1);

const Dates: FC<DatesProps> = ({ form, mediaType }) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const { control, setValue } = form;

	const watchDatesGte = useWatch({ control, name: 'dates.gte' });
	const watchDatesLte = useWatch({ control, name: 'dates.lte' });

	return (
		<Card colorMode={colorMode} isFullWidth p={2}>
			{/* TODO: Go over all setValues and place name from Controller instead of hardcoded string */}
			<FiltersFormCardHeader
				title={mediaType === 'movie' ? 'Release Date' : 'First Air Date'}
				subtitle=''
				renderMessage={({ fontSize, ...rest }) => (
					<SlideFade
						in={!!watchDatesGte || !!watchDatesLte}
						offsetY={round(getFontSizeHeight({ theme, fontSize }) / 4)}
					>
						<Text {...rest} fontSize={fontSize}>
							{dayjs(watchDatesGte).isSame(dayjs(watchDatesLte), 'date')
								? dayjs(watchDatesGte).format(visibleFormat)
								: compact([
										watchDatesGte ? `From: ${dayjs(watchDatesGte).format(visibleFormat)}` : null,
										watchDatesLte ? `To: ${dayjs(watchDatesLte).format(visibleFormat)}` : null
								  ]).join(' -> ')}
						</Text>
					</SlideFade>
				)}
				renderButton={(props) => (
					<Button
						{...props}
						isDisabled={!watchDatesGte && !watchDatesLte}
						onClick={() => setValue('dates', defaultValues.dates, { shouldDirty: true })}
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
								minDate={watchDatesGte ? dayjs(watchDatesGte, dataFormat).toDate() : minDate}
								maxDate={maxDate}
								monthsToDisplay={1}
								firstDayOfWeek={1}
								onSetDate={(date) => {
									setValue(name, dayjs(date).format(dataFormat), { shouldDirty: true });

									if (!watchDatesGte) {
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
	);
};

export default Dates;
