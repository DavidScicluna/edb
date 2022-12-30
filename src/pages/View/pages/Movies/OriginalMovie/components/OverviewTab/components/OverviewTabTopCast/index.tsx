import { FC, useState } from 'react';

import { useTheme, useDebounce, Button, Icon } from '@davidscicluna/component-library';

import { useMediaQuery, Text } from '@chakra-ui/react';

import { range, uniqBy } from 'lodash';
import { useUpdateEffect } from 'usehooks-ts';
import numbro from 'numbro';

import width from '../../../../../../../../../components/Posters/common/data/width';
import {
	HorizontalGrid,
	HorizontalGridHeader,
	HorizontalGridBody,
	HorizontalGridScroll,
	HorizontalGridFooter,
	QueryEmpty,
	QueryEmptyStack,
	QueryEmptyIcon,
	QueryEmptyBody,
	QueryEmptyTitle,
	QueryEmptySubtitle,
	DummyVerticalPoster,
	PersonVerticalPoster
} from '../../../../../../../../../components';
import { getEmptySubtitle } from '../../../../../../../../../components/QueryEmpty/common/utils';
import { useMovieContext } from '../../../../common/hooks';
import { movieTabs } from '../../../..';
import { Cast } from '../../../../../../../../../common/types/movie';
import { useUserTheme } from '../../../../../../../../../common/hooks';
import { formatMediaTypeLabel } from '../../../../../../../../../common/utils';

const OverviewTabTopCast: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const { movieQuery, creditsQuery, onSetActiveTab } = useMovieContext();

	const { data: movie, isFetching: isFetchingMovie, isLoading: isMovieLoading } = movieQuery || {};
	const { title } = movie || {};

	const {
		data: credits,
		isFetching: isFetchingCredits,
		isLoading: isCreditsLoading,
		isError: isCreditsError,
		isSuccess: isCreditsSuccess
	} = creditsQuery || {};
	const { cast = [], crew = [] } = credits || {};

	const [topCast, setTopCast] = useState<Cast[]>(uniqBy([...cast], 'id').filter((_mediaItem, index) => index < 20));
	const topCastDebounced = useDebounce<Cast[]>(topCast, 'slow');

	useUpdateEffect(() => {
		setTopCast(uniqBy([...cast], 'id').filter((_mediaItem, index) => index < 20));
	}, [cast]);

	return (
		// TODO: Go over all HorizontalGrid and disabled if loading or error or not items
		<HorizontalGrid
			colorMode={colorMode}
			isDisabled={
				topCastDebounced.length === 0 ||
				isFetchingMovie ||
				isMovieLoading ||
				isFetchingCredits ||
				isCreditsLoading
			}
			isFullWidth
			spacing={2}
			p={2}
		>
			<HorizontalGridHeader
				renderTitle={(props) => <Text {...props}>Top Cast</Text>}
				renderSubtitle={(props) => (
					<Text {...props}>
						{`This list is showcasing the top cast of ${
							title ? title : `the ${formatMediaTypeLabel({ type: 'single', mediaType: 'movie' })}`
						}`}
					</Text>
				)}
				arrowProps={{ variant: 'icon' }}
				spacing={0}
			/>
			<HorizontalGridBody>
				{!(isFetchingMovie || isMovieLoading || isFetchingCredits || isCreditsLoading) && isCreditsError ? (
					<QueryEmpty color={color} colorMode={colorMode}>
						<QueryEmptyStack>
							<QueryEmptyIcon
								renderIcon={(props) => (
									<Icon
										{...props}
										width={theme.fontSizes['6xl']}
										height={theme.fontSizes['6xl']}
										fontSize={theme.fontSizes['6xl']}
										icon='error_outline'
									/>
								)}
								p={2}
							/>
							<QueryEmptyBody>
								<QueryEmptyTitle />
								<QueryEmptySubtitle>
									{getEmptySubtitle({
										type: 'error',
										label: title ? `${title} Top Cast` : 'Top Cast'
									})}
								</QueryEmptySubtitle>
							</QueryEmptyBody>
						</QueryEmptyStack>
					</QueryEmpty>
				) : !(isFetchingMovie || isMovieLoading || isFetchingCredits || isCreditsLoading) &&
				  isCreditsSuccess &&
				  topCastDebounced &&
				  topCastDebounced.length === 0 ? (
					<QueryEmpty color={color} colorMode={colorMode}>
						<QueryEmptyStack>
							<QueryEmptyBody>
								<QueryEmptyTitle />
								<QueryEmptySubtitle>
									{getEmptySubtitle({
										type: 'empty',
										label: title ? `${title} Top Cast` : 'Top Cast'
									})}
								</QueryEmptySubtitle>
							</QueryEmptyBody>
						</QueryEmptyStack>
					</QueryEmpty>
				) : !(isFetchingMovie || isMovieLoading || isFetchingCredits || isCreditsLoading) &&
				  isCreditsSuccess &&
				  topCastDebounced &&
				  topCastDebounced.length > 0 ? (
					<HorizontalGridScroll>
						{topCastDebounced.map((person) => (
							<PersonVerticalPoster
								key={person.id}
								person={person}
								subtitle={person.character ? `As ${person.character}` : undefined}
								sx={{ width }}
							/>
						))}
					</HorizontalGridScroll>
				) : (
					<HorizontalGridScroll>
						{range(20).map((_dummy, index) => (
							<DummyVerticalPoster key={index} mediaType='person' hasSubtitle sx={{ width }} />
						))}
					</HorizontalGridScroll>
				)}
			</HorizontalGridBody>
			<HorizontalGridFooter>
				<Button
					color={color}
					colorMode={colorMode}
					isDisabled={cast.length + crew.length === 0}
					isFullWidth
					onClick={() =>
						onSetActiveTab({ index: movieTabs.findIndex(({ path }) => path.hash === 'cast') || 1 })
					}
					size={isSm ? 'xs' : 'sm'}
					variant='text'
				>
					{`View all ${numbro(cast.length + crew.length).format({ average: true })} Cast`}
				</Button>
			</HorizontalGridFooter>
		</HorizontalGrid>
	);
};

export default OverviewTabTopCast;
