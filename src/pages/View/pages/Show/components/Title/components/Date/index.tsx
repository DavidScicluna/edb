import { ReactElement } from 'react';

import { useConst, Text } from '@chakra-ui/react';

import range from 'lodash/range';
import sample from 'lodash/sample';

import { DateProps } from './types';

import { handleReturnDate } from '../../../../../../../../common/utils';
import SkeletonText from '../../../../../../../../components/Skeleton/Text';

const dummies = range(25, 200, 5);

const Date = (props: DateProps): ReactElement => {
	const { in_production = false, first_air_date, last_air_date, color, fontSize, isLoading = true } = props;

	const dummy = useConst<number>(sample(dummies) || 50);

	// TODO: Check if date is empty with lodash
	const handleDate = (): string => {
		if (!in_production && last_air_date) {
			const firstYear = handleReturnDate(first_air_date || '', 'year');
			const lastYear = handleReturnDate(last_air_date || '', 'year');

			if (firstYear === lastYear) {
				return lastYear;
			} else {
				return `${firstYear} - ${lastYear}`;
			}
		} else {
			return `${handleReturnDate(first_air_date || '', 'year')} - present`;
		}
	};

	return (
		<SkeletonText width={isLoading ? `${dummy}px` : 'auto'} fontSize={fontSize} isLoaded={!isLoading}>
			<Text align='left' color={color} fontSize={fontSize} whiteSpace='nowrap'>
				{first_air_date && last_air_date && !isLoading ? handleDate() : 'TV Show Date'}
			</Text>
		</SkeletonText>
	);
};

export default Date;
