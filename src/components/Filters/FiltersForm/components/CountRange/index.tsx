import { FC } from 'react';

import { useTheme, Card, CardBody, ButtonGroup, ButtonGroupItem, Button } from '@davidscicluna/component-library';

import { useMediaQuery, Text } from '@chakra-ui/react';

import { Controller } from 'react-hook-form';
import { compact, toString } from 'lodash';

import defaultValues from '../../../common/data/defaults';
import { getIsFiltersFormNumbersInList, getFiltersFormNumbers } from '../../common/utils';
import FiltersFormCardHeader from '../FiltersFormCardHeaders';
import { CommonFiltersFormProps as CountRangeProps } from '../../common/types';
import { useUserTheme } from '../../../../../common/hooks';
import { counts } from '../../../common/data/arrays';

const CountRange: FC<CountRangeProps> = ({ form }) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isMd] = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);

	const { control, setValue } = form;

	return (
		<Controller
			control={control}
			name='count'
			render={({ field: { onBlur, value, name } }) => (
				<Card colorMode={colorMode} isFullWidth onBlur={onBlur} p={2}>
					<FiltersFormCardHeader
						title='Number of Ratings Range'
						subtitle=''
						renderMessage={(props) => (
							<Text {...props}>{value.map((count) => `${count} ratings`).join(' -> ')}</Text>
						)}
						renderButton={(props) => (
							<Button
								{...props}
								isDisabled={value.length === 0}
								onClick={() => setValue('count', defaultValues.count, { shouldDirty: true })}
							>
								Clear
							</Button>
						)}
						isMessageVisible={value.length > 0}
					/>
					<CardBody>
						<ButtonGroup sx={{ width: '100%', flexWrap: isMd ? 'wrap' : 'nowrap' }}>
							{counts.map((count, index) => (
								<ButtonGroupItem
									key={count}
									index={index}
									total={counts.length - 1}
									sx={{ flex: isMd ? 1 : undefined, width: isMd ? `${100 / 6}%` : 'auto' }}
								>
									<Button
										color={
											getIsFiltersFormNumbersInList({ list: compact(value), number: count })
												? color
												: 'gray'
										}
										colorMode={colorMode}
										isFullWidth
										onClick={() =>
											setValue(
												name,
												getFiltersFormNumbers({ list: compact(value), number: count }),
												{
													shouldDirty: true
												}
											)
										}
										variant={value.some((num) => num === count) ? 'contained' : 'outlined'}
									>
										{toString(count)}
									</Button>
								</ButtonGroupItem>
							))}
						</ButtonGroup>
					</CardBody>
				</Card>
			)}
		/>
	);
};

export default CountRange;
