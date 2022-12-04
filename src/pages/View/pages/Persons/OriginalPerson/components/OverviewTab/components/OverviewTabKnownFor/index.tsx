import { FC, useState } from 'react';

import { useTheme, useDebounce, Button, Icon } from '@davidscicluna/component-library';

import { useMediaQuery, Text } from '@chakra-ui/react';

import { compact, range, sample } from 'lodash';
import { useUpdateEffect } from 'usehooks-ts';
import numbro from 'numbro';

import width from '../../../../../../../../../components/Posters/common/data/width';
import { useUserTheme } from '../../../../../../../../../common/hooks';
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
	QueryEmptyActions,
	DummyVerticalPoster,
	MovieVerticalPoster,
	TVShowVerticalPoster
} from '../../../../../../../../../components';
import { getEmptySubtitle } from '../../../../../../../../../components/QueryEmpty/common/utils';
import { usePersonContext } from '../../../../common/hooks';
import { getKnownFor } from '../../../../common/utils';
import { tabs } from '../../../..';
import { formatMediaTypeLabel } from '../../../../../../../../../common/utils';
import { PersonKnownForCredits } from '../../../../types';
import { Credits } from '../../../../../../../../../common/types/person';

const randoms: [0, 1] = [0, 1];

const OverviewTabKnownFor: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const { personQuery, movieCreditsQuery, tvShowCreditsQuery, onSetActiveTab } = usePersonContext();

	const { data: person } = personQuery || {};
	const { name } = person || {};

	const {
		data: movieCredits,
		isFetching: isMovieCreditsFetching,
		isLoading: isMovieCreditsLoading,
		isError: isMovieCreditsError
	} = movieCreditsQuery || {};
	const { cast: movieCastCredits = [], crew: movieCrewCredits = [] } = movieCredits || {};

	const {
		data: tvShowCredits,
		isFetching: isTVShowCreditsFetching,
		isLoading: isTVShowCreditsLoading,
		isError: isTVShowCreditsError
	} = tvShowCreditsQuery || {};
	const { cast: tvShowCastCredits = [], crew: tvShowCrewCredits = [] } = tvShowCredits || {};

	const [knownFor, setKnownFor] = useState<PersonKnownForCredits>(
		getKnownFor({
			credits: {
				cast: [
					...movieCastCredits.map((movie) => {
						return { ...movie, media_type: 'movie' };
					}),
					...tvShowCastCredits.map((movie) => {
						return { ...movie, media_type: 'movie' };
					})
				] as NonNullable<Credits['cast']>,
				crew: [
					...movieCrewCredits.map((show) => {
						return { ...show, media_type: 'tv' };
					}),
					...tvShowCrewCredits.map((show) => {
						return { ...show, media_type: 'tv' };
					})
				] as NonNullable<Credits['crew']>
			}
		}) || []
	);
	const knownForDebounced = useDebounce<PersonKnownForCredits>(knownFor, 'slow');

	useUpdateEffect(() => {
		setKnownFor(
			getKnownFor({
				credits: {
					cast: [
						...movieCastCredits.map((movie) => {
							return { ...movie, media_type: 'movie' };
						}),
						...tvShowCastCredits.map((movie) => {
							return { ...movie, media_type: 'movie' };
						})
					] as NonNullable<Credits['cast']>,
					crew: [
						...movieCrewCredits.map((show) => {
							return { ...show, media_type: 'tv' };
						}),
						...tvShowCrewCredits.map((show) => {
							return { ...show, media_type: 'tv' };
						})
					] as NonNullable<Credits['crew']>
				}
			}) || []
		);
	}, [movieCastCredits, tvShowCastCredits, movieCrewCredits, tvShowCrewCredits]);

	return (
		// TODO: Go over all HorizontalGrid and disabled if loading or error or not items
		<HorizontalGrid
			colorMode={colorMode}
			isDisabled={
				knownForDebounced.length === 0 ||
				isMovieCreditsFetching ||
				isMovieCreditsLoading ||
				isTVShowCreditsFetching ||
				isTVShowCreditsLoading
			}
			isFullWidth
			spacing={2}
			p={2}
		>
			<HorizontalGridHeader
				renderTitle={(props) => <Text {...props}>Known For</Text>}
				renderSubtitle={(props) => (
					<Text {...props}>
						{`This list is showcasing all the ${formatMediaTypeLabel({
							type: 'multiple',
							mediaType: 'movie'
						})} & ${formatMediaTypeLabel({
							type: 'multiple',
							mediaType: 'tv'
						})} that ${name || 'the person'} is most known for`}
					</Text>
				)}
				arrowProps={{ variant: 'icon' }}
				spacing={0}
			/>
			<HorizontalGridBody>
				{!(
					isMovieCreditsFetching ||
					isMovieCreditsLoading ||
					isTVShowCreditsFetching ||
					isTVShowCreditsLoading
				) &&
				isMovieCreditsError &&
				isTVShowCreditsError ? (
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
										label: name ? `${name} known for credits` : 'Known for credits'
									})}
								</QueryEmptySubtitle>
							</QueryEmptyBody>
							<QueryEmptyActions renderActions={(props) => <Button {...props}>Try Again</Button>} />
						</QueryEmptyStack>
					</QueryEmpty>
				) : !(
						isMovieCreditsFetching ||
						isMovieCreditsLoading ||
						isTVShowCreditsFetching ||
						isTVShowCreditsLoading
				  ) &&
				  knownForDebounced &&
				  knownForDebounced.length === 0 ? (
					<QueryEmpty color={color} colorMode={colorMode}>
						<QueryEmptyStack>
							<QueryEmptyBody>
								<QueryEmptyTitle />
								<QueryEmptySubtitle>
									{getEmptySubtitle({
										type: 'empty',
										label: name ? `${name} known for credits` : 'Known for credits'
									})}
								</QueryEmptySubtitle>
							</QueryEmptyBody>
							<QueryEmptyActions renderActions={(props) => <Button {...props}>Try Again</Button>} />
						</QueryEmptyStack>
					</QueryEmpty>
				) : !(
						isMovieCreditsFetching ||
						isMovieCreditsLoading ||
						isTVShowCreditsFetching ||
						isTVShowCreditsLoading
				  ) &&
				  knownForDebounced &&
				  knownForDebounced.length > 0 ? (
					<HorizontalGridScroll>
						{compact(
							knownForDebounced.map((mediaItem) =>
								mediaItem.media_type === 'movie' ? (
									<MovieVerticalPoster key={mediaItem.id} movie={mediaItem} sx={{ width }} />
								) : mediaItem.media_type === 'tv' ? (
									<TVShowVerticalPoster key={mediaItem.id} show={mediaItem} sx={{ width }} />
								) : null
							)
						)}
					</HorizontalGridScroll>
				) : (
					<HorizontalGridScroll>
						{range(20).map((_dummy, index) => (
							<DummyVerticalPoster
								key={index}
								mediaType={sample(randoms) === 0 ? 'movie' : 'tv'}
								hasSubtitle
								sx={{ width }}
							/>
						))}
					</HorizontalGridScroll>
				)}
			</HorizontalGridBody>
			<HorizontalGridFooter>
				<Button
					color={color}
					colorMode={colorMode}
					isFullWidth
					onClick={() =>
						onSetActiveTab({ index: tabs.findIndex(({ path }) => path.hash === 'credits') || 1 })
					}
					size={isSm ? 'xs' : 'sm'}
					variant='text'
				>
					{`View all ${numbro(
						movieCastCredits.length +
							movieCrewCredits.length +
							tvShowCastCredits.length +
							tvShowCrewCredits.length
					).format({ average: true })} credits`}
				</Button>
			</HorizontalGridFooter>
		</HorizontalGrid>
	);
};

export default OverviewTabKnownFor;
