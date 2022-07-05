import { ReactElement, useState, useEffect } from 'react';

import { Skeleton, Button } from '@davidscicluna/component-library';

import { VStack, SimpleGrid } from '@chakra-ui/react';

import range from 'lodash/range';

import years from '../../common/data/years';

import Header from './components/Header';
import { Direction } from './components/Header/types';
import { YearsProps } from './types';

const Years = (props: YearsProps): ReactElement => {
	const [currentYears, setCurrentYears] = useState<number[]>([]);
	const [index, setIndex] = useState<number>(0);

	const { color, year, minDate, maxDate, onYearsClick } = props;

	const handleNavigate = (direction: Direction): void => {
		if (direction === 'back') {
			setIndex(index + 1);
			handleReturnYears(index + 1);
		} else if (direction === 'forward') {
			setIndex(index - 1);
			handleReturnYears(index - 1);
		}
	};

	const handleIsDisabled = (year: number): boolean => {
		if (minDate && maxDate) {
			const minYear = minDate.getFullYear();
			const maxYear = maxDate.getFullYear();

			return year < minYear || year > maxYear;
		} else {
			return false;
		}
	};

	const handleReturnYears = (index: number): void => {
		const previousYears = years[index + 1] || undefined;
		const currentYears = years[index];
		const nextYears = years[index - 1] || undefined;

		if (previousYears && nextYears) {
			setCurrentYears([previousYears[previousYears.length - 1], ...currentYears, nextYears[0]]);
		} else if (previousYears && !nextYears) {
			setCurrentYears([
				previousYears[previousYears.length - 2],
				previousYears[previousYears.length - 1],
				...currentYears
			]);
		} else if (!previousYears && nextYears) {
			setCurrentYears([...currentYears, nextYears[0], nextYears[1]]);
		} else {
			setCurrentYears([...currentYears]);
		}
	};

	useEffect(() => {
		for (const key in years) {
			if (years[key].some((paramYears) => paramYears === year)) {
				setIndex(Number(key));
				handleReturnYears(Number(key));
			}
		}
	}, [year]);

	return (
		<VStack width='100%' p={2}>
			<Header
				currentYears={currentYears}
				index={index}
				minDate={minDate}
				maxDate={maxDate}
				onNavigateClick={handleNavigate}
			/>
			<SimpleGrid width='100%' columns={[3, 4]} spacing={0}>
				{currentYears.length > 0
					? currentYears.map((paramYears) => (
							<Button
								key={paramYears}
								color={paramYears === year ? color : 'gray'}
								isDisabled={handleIsDisabled(paramYears)}
								isFullWidth
								onClick={() => onYearsClick(paramYears)}
								size='lg'
								variant='text'
							>
								{paramYears}
							</Button>
					  ))
					: range(0, 12).map((_dummy, index) => (
							<Button key={index} isDisabled isFullWidth size='lg' variant='text'>
								<Skeleton isLoaded={false} variant='text'>
									9999
								</Skeleton>
							</Button>
					  ))}
			</SimpleGrid>
		</VStack>
	);
};

export default Years;
