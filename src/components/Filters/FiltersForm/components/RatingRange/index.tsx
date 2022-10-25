import { FC } from 'react';

import {
	useTheme,
	Card,
	CardBody,
	ButtonGroup,
	ButtonGroupItem,
	Button,
	SlideFade
} from '@davidscicluna/component-library';

import { useMediaQuery, useConst } from '@chakra-ui/react';

import { Controller } from 'react-hook-form';
import compact from 'lodash/compact';
import range from 'lodash/range';
import { round, toString } from 'lodash';

import defaultValues from '../../../common/data/defaults';
import { useUserTheme } from '../../../../../common/hooks';
import Rating from '../../../../Ratings/Rating';
import { getIsFiltersFormNumbersInList, getFiltersFormNumbers } from '../../common/utils';
import FiltersFormCardHeader from '../FiltersFormCardHeaders';
import { CommonFiltersFormProps as RatingRangeProps } from '../../common/types';
import { RatingSize } from '../../../../Ratings/common/types';
import { getFontSizeHeight } from '../../../../../common/utils';

const RatingRange: FC<RatingRangeProps> = ({ form }) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isMd] = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);

	const { control, setValue } = form;

	const ratings = useConst(range(0, 11));

	return (
		<Controller
			control={control}
			name='rating'
			render={({ field: { onBlur, value, name } }) => (
				<Card colorMode={colorMode} isFullWidth onBlur={onBlur} p={2}>
					<FiltersFormCardHeader
						title='Rating Range'
						subtitle=''
						renderMessage={({ fontSize, ...rest }) => (
							<SlideFade
								in={value.length > 0}
								offsetY={round(getFontSizeHeight({ theme, fontSize }) / 4)}
							>
								<Rating rating={value.join(' -> ')} size={fontSize as RatingSize} />
							</SlideFade>
						)}
						renderButton={(props) => (
							<Button
								{...props}
								isDisabled={value.length === 0}
								onClick={() => setValue(name, defaultValues.rating, { shouldDirty: true })}
							>
								Clear
							</Button>
						)}
					/>
					<CardBody>
						<ButtonGroup sx={{ width: '100%', flexWrap: isMd ? 'wrap' : 'nowrap' }}>
							{ratings.map((rating, index) => (
								<ButtonGroupItem
									index={index}
									total={ratings.length - 1}
									sx={{ flex: isMd ? 1 : undefined, width: isMd ? `${100 / 6}%` : 'auto' }}
								>
									<Button
										key={rating}
										color={
											getIsFiltersFormNumbersInList({ list: compact(value), number: rating })
												? color
												: 'gray'
										}
										colorMode={colorMode}
										isFullWidth
										onClick={() =>
											setValue(
												name,
												getFiltersFormNumbers({ list: compact(value), number: rating }),
												{ shouldDirty: true }
											)
										}
										variant={value.some((num) => num === rating) ? 'contained' : 'outlined'}
									>
										{toString(rating)}
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

export default RatingRange;