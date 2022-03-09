import { ReactElement, useState, useEffect } from 'react';
import { useLocation } from 'react-router';

import { useColorMode, useMediaQuery, Stack, Center } from '@chakra-ui/react';

import { compact, isNil, isEmpty } from 'lodash';
import { useElementSize } from 'usehooks-ts';

import Certifications from './components/Certifications';
import Count from './components/Count';
import Dates from './components/Dates';
import Genres from './components/Genres';
import Rating from './components/Rating';
import Runtime from './components/Runtime';
import { DisplayFiltersProps } from './types';

import Button from '../../Clickable/Button';
import Divider from '../../Divider';
import HorizontalScroll from '../../HorizontalScroll';
import { handleReturnDefaultValues, handlePopulateFilters } from '../common/utils';
import { Filters } from '../types';

export const defaultValues: Filters = handleReturnDefaultValues();

const DisplayFilters = ({ mediaType, onTagClick, onTagDelete, onClear }: DisplayFiltersProps): ReactElement => {
	const { colorMode } = useColorMode();
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const location = useLocation();

	const [ref, { width, height }] = useElementSize();

	const [filters, setFilters] = useState<Filters>(defaultValues);

	useEffect(() => {
		if (location.search && location.search.length > 0) {
			setFilters(handlePopulateFilters(location.search, mediaType));
		}
	}, [location.search]);

	return (
		<Stack
			width='100%'
			direction={isSm ? 'column' : 'row'}
			borderBottomColor={`gray.${colorMode === 'light' ? 200 : 700}`}
			borderBottomWidth='2px'
			divider={!isSm ? <Divider orientation='vertical' height={`${height}px`} /> : undefined}
			pb={2}
			spacing={2}
		>
			<Center width={`calc(100% - ${!isSm ? width + 34 : 0}px)`}>
				<HorizontalScroll renderDivider={() => <Center mr={2} />}>
					{compact([
						!(isNil(filters.dates.gte) || isEmpty(filters.dates.gte)) ||
						!(isNil(filters.dates.lte) || isEmpty(filters.dates.lte)) ? (
							<Dates
								key='display_filters_dates'
								dates={filters.dates}
								mediaType={mediaType}
								onClick={onTagClick ? () => onTagClick('dates', filters) : undefined}
								onDelete={onTagDelete ? () => onTagDelete('dates', filters) : undefined}
							/>
						) : null,

						!(isNil(filters.genres) || isEmpty(filters.genres)) ? (
							<Genres
								key='display_filters_genres'
								genres={filters.genres}
								mediaType={mediaType}
								onClick={onTagClick ? () => onTagClick('genres', filters) : undefined}
								onDelete={onTagDelete ? () => onTagDelete('genres', filters) : undefined}
							/>
						) : null,

						!(isNil(filters.certifications) || isEmpty(filters.certifications)) ? (
							<Certifications
								key='display_filters_certifications'
								certifications={filters.certifications}
								onClick={onTagClick ? () => onTagClick('certifications', filters) : undefined}
								onDelete={onTagDelete ? () => onTagDelete('certifications', filters) : undefined}
							/>
						) : null,

						!(isNil(filters.rating) || isEmpty(filters.rating)) ? (
							<Rating
								key='display_filters_rating'
								ratings={filters.rating}
								onClick={onTagClick ? () => onTagClick('rating', filters) : undefined}
								onDelete={onTagDelete ? () => onTagDelete('rating', filters) : undefined}
							/>
						) : null,

						!(isNil(filters.count) || isEmpty(filters.count)) ? (
							<Count
								key='display_filters_count'
								counts={filters.count}
								onClick={onTagClick ? () => onTagClick('count', filters) : undefined}
								onDelete={onTagDelete ? () => onTagDelete('count', filters) : undefined}
							/>
						) : null,

						!(isNil(filters.runtime) || isEmpty(filters.runtime)) ? (
							<Runtime
								key='display_filters_runtime'
								runtimes={filters.runtime}
								onClick={onTagClick ? () => onTagClick('runtime', filters) : undefined}
								onDelete={onTagDelete ? () => onTagDelete('runtime', filters) : undefined}
							/>
						) : null
					])}
				</HorizontalScroll>
			</Center>

			<Center ref={ref}>
				<Button isFullWidth={isSm} onClick={() => onClear(filters)} variant='outlined'>
					Clear Filters
				</Button>
			</Center>
		</Stack>
	);
};

export default DisplayFilters;
