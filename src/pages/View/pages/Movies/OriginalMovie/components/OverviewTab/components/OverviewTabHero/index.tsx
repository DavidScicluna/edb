import { FC } from 'react';

import { useMovieContext } from '../../../../common/hooks';
import Hero from '../../../../../../../components/ViewHero';
import ViewHeroCover from '../../../../../../../components/ViewHero/components/ViewHeroCover';
import ViewHeroCoverDummyBackdrop from '../../../../../../../components/ViewHero/components/ViewHeroCover/components/ViewHeroCoverDummyBackdrop';
import ViewHeroCoverDummyPoster from '../../../../../../../components/ViewHero/components/ViewHeroCover/components/ViewHeroCoverDummyPoster';
import ViewHeroDummyPlot from '../../../../../../../components/ViewHero/components/ViewHeroDummyPlot';
import ViewHeroDummyTagline from '../../../../../../../components/ViewHero/components/ViewHeroDummyTagline';
import ViewHeroPlot from '../../../../../../../components/ViewHero/components/ViewHeroPlot';
import ViewHeroTagline from '../../../../../../../components/ViewHero/components/ViewHeroTagline';
import ViewHeroGenres from '../../../../../../../components/ViewHero/components/ViewHeroGenres';
import { useMediaTypeKeywordsQuery } from '../../../../../../../../../common/queries';
import ViewHeroKeywords from '../../../../../../../components/ViewHero/components/ViewHeroKeywords';
import ViewHeroDummyKeywords from '../../../../../../../components/ViewHero/components/ViewHeroDummyKeywords';
import ViewHeroDummyGenres from '../../../../../../../components/ViewHero/components/ViewHeroDummyGenres';
import ViewHeroCrew from '../../../../../../../components/ViewHero/components/ViewHeroCrew';
import ViewHeroDummyCrew from '../../../../../../../components/ViewHero/components/ViewHeroDummyCrew';
import ViewHeroVStack from '../../../../../../../components/ViewHero/components/ViewHeroVStack';

import OverviewTabHeroBackdrop from './components/OverviewTabHeroBackdrop';
import OverviewTabHeroPoster from './components/OverviewTabHeroPoster';

const OverviewTabHero: FC = () => {
	const { movieQuery, creditsQuery } = useMovieContext();

	const { data: movie, isFetching: isFetchingMovie, isLoading: isMovieLoading } = movieQuery || {};
	const { id, tagline, overview, genres = [] } = movie || {};

	const { data: credits, isFetching: isFetchingCredits, isLoading: isCreditsLoading } = creditsQuery || {};
	const { crew: crewCredits = [] } = credits || {};

	const {
		data,
		isFetching: isFetchingKeywords,
		isLoading: isKeywordsLoading
	} = useMediaTypeKeywordsQuery({
		props: { mediaType: 'movie', id: Number(id) },
		options: { enabled: !!movie?.id }
	});
	const { keywords = [] } = data || {};

	const directors = crewCredits.filter(({ job }) => job === 'Director');
	const executiveProducers = crewCredits.filter(({ job }) => job === 'Executive Producer');
	const producers = crewCredits.filter(({ job }) => job === 'Producer');
	const writers = crewCredits.filter(({ job }) => job === 'Writer');

	return (
		<Hero>
			<ViewHeroVStack>
				<ViewHeroCover
					renderPoster={() =>
						isFetchingMovie || isMovieLoading ? (
							<ViewHeroCoverDummyPoster />
						) : movie ? (
							<OverviewTabHeroPoster movie={movie} />
						) : (
							<div />
						)
					}
					renderBackdrop={() =>
						isFetchingMovie || isMovieLoading ? (
							<ViewHeroCoverDummyBackdrop />
						) : movie ? (
							<OverviewTabHeroBackdrop movie={movie} />
						) : (
							<div />
						)
					}
				/>

				<ViewHeroVStack px={2} pb={2}>
					{isFetchingMovie || isMovieLoading ? (
						<ViewHeroDummyTagline />
					) : tagline ? (
						<ViewHeroTagline tagline={tagline} />
					) : null}

					{isFetchingMovie || isMovieLoading ? (
						<ViewHeroDummyPlot />
					) : overview ? (
						<ViewHeroPlot plot={overview} />
					) : null}

					{isFetchingMovie || isMovieLoading ? (
						<ViewHeroDummyGenres />
					) : genres.length > 0 ? (
						<ViewHeroGenres mediaType='movie' genres={genres} />
					) : null}

					{isFetchingCredits || isCreditsLoading ? (
						<ViewHeroDummyCrew label='Directors' />
					) : directors.length > 0 ? (
						<ViewHeroCrew<'movie'>
							label={directors.length === 1 ? 'Director' : 'Directors'}
							crew={directors}
						/>
					) : null}

					{isFetchingCredits || isCreditsLoading ? (
						<ViewHeroDummyCrew label='Executive Producers' />
					) : executiveProducers.length > 0 ? (
						<ViewHeroCrew<'movie'>
							label={executiveProducers.length === 1 ? 'Executive Producer' : 'Executive Producers'}
							crew={executiveProducers}
						/>
					) : null}

					{isFetchingCredits || isCreditsLoading ? (
						<ViewHeroDummyCrew label='Producers' />
					) : producers.length > 0 ? (
						<ViewHeroCrew<'movie'>
							label={producers.length === 1 ? 'Producer' : 'Producers'}
							crew={producers}
						/>
					) : null}

					{isFetchingCredits || isCreditsLoading ? (
						<ViewHeroDummyCrew label='Writers' />
					) : writers.length > 0 ? (
						<ViewHeroCrew<'movie'> label={writers.length === 1 ? 'Writer' : 'Writers'} crew={writers} />
					) : null}

					{isFetchingKeywords || isKeywordsLoading ? (
						<ViewHeroDummyKeywords />
					) : keywords.length > 0 ? (
						<ViewHeroKeywords mediaType='movie' keywords={keywords} />
					) : null}
				</ViewHeroVStack>
			</ViewHeroVStack>
		</Hero>
	);
};

export default OverviewTabHero;
