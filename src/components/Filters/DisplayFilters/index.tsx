import { FC, useState, useEffect } from 'react';

import { useLocation } from 'react-router';

import {
	Space,
	useTheme,
	useDebounce,
	HorizontalScroll,
	Divider,
	Button,
	utils
} from '@davidscicluna/component-library';

import { useMediaQuery, Stack, Center } from '@chakra-ui/react';

import { compact } from 'lodash';
import { useElementSize } from 'usehooks-ts';

import { getFiltersForm } from '../common/utils';
import { FiltersForm } from '../types';
import defaultValues from '../common/data/defaults';
import { useUserTheme } from '../../../common/hooks';

import Certifications from './components/Certifications';
import Count from './components/CountRange';
import Dates from './components/Dates';
import Genres from './components/Genres';
import Keywords from './components/Keywords';
import Rating from './components/RatingRange';
import Runtime from './components/RuntimeRange';
import { DisplayFiltersProps } from './types';

const { convertREMToPixels, convertStringToNumber } = utils;

const spacing: Space = 2;

const DisplayFilters: FC<DisplayFiltersProps> = ({ mediaType, onTagClick, onTagDelete, onClear }) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const location = useLocation();

	const [buttonRef, { width: buttonWidth }] = useElementSize();

	const [filters, setFilters] = useState<FiltersForm>(defaultValues);
	const filtersDebounced = useDebounce<FiltersForm>(filters, 'slow');

	const handleSetFilters = (): void => {
		if (location.search && location.search.length > 0) {
			setFilters(getFiltersForm({ location, mediaType }));
		}
	};

	const handleContentWidth = (): string => {
		const spacingWidth = convertREMToPixels(convertStringToNumber(theme.space[spacing], 'rem')) * 2;

		return `calc(100% - ${buttonWidth + spacingWidth}px)`;
	};

	useEffect(() => handleSetFilters(), [location.search]);

	return (
		<Stack
			width='100%'
			direction={isSm ? 'column' : 'row'}
			alignItems='stretch'
			justifyContent='stretch'
			divider={!isSm ? <Divider colorMode={colorMode} orientation='vertical' /> : undefined}
			spacing={spacing}
		>
			<Center width={handleContentWidth()}>
				<HorizontalScroll colorMode={colorMode} renderDivider={({ padding }) => <Center p={padding} />}>
					{compact([
						filtersDebounced.dates.gte !== defaultValues.dates.gte ||
						filtersDebounced.dates.lte !== defaultValues.dates.lte ? (
							<Dates
								dates={filtersDebounced.dates}
								mediaType={mediaType}
								onClick={
									onTagClick
										? () => onTagClick({ filter: 'genres', form: filtersDebounced })
										: undefined
								}
								onDelete={
									onTagDelete
										? () => onTagDelete({ filter: 'genres', form: filtersDebounced })
										: undefined
								}
							/>
						) : null,

						filtersDebounced.genres !== defaultValues.genres ? (
							<Genres
								genres={filtersDebounced.genres}
								mediaType={mediaType}
								onClick={
									onTagClick
										? () => onTagClick({ filter: 'genres', form: filtersDebounced })
										: undefined
								}
								onDelete={
									onTagDelete
										? () => onTagDelete({ filter: 'genres', form: filtersDebounced })
										: undefined
								}
							/>
						) : null,

						filtersDebounced.certifications !== defaultValues.certifications ? (
							<Certifications
								certifications={filtersDebounced.certifications}
								onClick={
									onTagClick
										? () => onTagClick({ filter: 'certifications', form: filtersDebounced })
										: undefined
								}
								onDelete={
									onTagDelete
										? () => onTagDelete({ filter: 'certifications', form: filtersDebounced })
										: undefined
								}
							/>
						) : null,

						filtersDebounced.rating !== defaultValues.rating ? (
							<Rating
								ratings={filtersDebounced.rating}
								onClick={
									onTagClick
										? () => onTagClick({ filter: 'rating', form: filtersDebounced })
										: undefined
								}
								onDelete={
									onTagDelete
										? () => onTagDelete({ filter: 'rating', form: filtersDebounced })
										: undefined
								}
							/>
						) : null,

						filtersDebounced.count !== defaultValues.count ? (
							<Count
								counts={filtersDebounced.count}
								onClick={
									onTagClick
										? () => onTagClick({ filter: 'count', form: filtersDebounced })
										: undefined
								}
								onDelete={
									onTagDelete
										? () => onTagDelete({ filter: 'count', form: filtersDebounced })
										: undefined
								}
							/>
						) : null,

						filtersDebounced.runtime !== defaultValues.runtime ? (
							<Runtime
								runtimes={filtersDebounced.runtime}
								onClick={
									onTagClick
										? () => onTagClick({ filter: 'runtime', form: filtersDebounced })
										: undefined
								}
								onDelete={
									onTagDelete
										? () => onTagDelete({ filter: 'runtime', form: filtersDebounced })
										: undefined
								}
							/>
						) : null,

						filtersDebounced.keywords !== defaultValues.keywords ? (
							<Keywords
								keywords={filtersDebounced.keywords}
								onClick={
									onTagClick
										? () => onTagClick({ filter: 'keywords', form: filtersDebounced })
										: undefined
								}
								onDelete={
									onTagDelete
										? () => onTagDelete({ filter: 'keywords', form: filtersDebounced })
										: undefined
								}
							/>
						) : null
					])}
				</HorizontalScroll>
			</Center>

			<Center ref={buttonRef}>
				<Button
					colorMode={colorMode}
					isFullWidth={isSm}
					onClick={() => onClear({ ...defaultValues })}
					size='xs'
					variant='outlined'
				>
					Clear Filters
				</Button>
			</Center>
		</Stack>
	);
};

export default DisplayFilters;
