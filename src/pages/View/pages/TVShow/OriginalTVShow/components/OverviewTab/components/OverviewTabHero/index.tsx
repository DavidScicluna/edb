import { FC } from 'react';

import { useTVShowContext } from '../../../../common/hooks';
import ViewHero from '../../../../../../../components/ViewHero';
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
	const { showQuery, creditsQuery } = useTVShowContext();

	const { data: show, isFetching: isFetchingTVShow, isLoading: isTVShowLoading } = showQuery || {};
	const { id, tagline, overview, genres = [], created_by = [] } = show || {};

	const { data: credits, isFetching: isFetchingCredits, isLoading: isCreditsLoading } = creditsQuery || {};
	const { crew: crewCredits = [] } = credits || {};

	const {
		data: keywordsPayload,
		isFetching: isFetchingKeywords,
		isLoading: isKeywordsLoading
	} = useMediaTypeKeywordsQuery<'tv'>({
		props: { mediaType: 'tv', id: Number(id) },
		options: { enabled: !!id }
	});
	const { results = [] } = keywordsPayload || {};

	const directors = crewCredits.filter(({ department }) => department === 'Directing');
	const producers = crewCredits.filter(({ department }) => department === 'Production');
	const editors = crewCredits.filter(({ department }) => department === 'Editing');
	const writers = crewCredits.filter(({ department }) => department === 'Writing');

	return (
		<ViewHero>
			<ViewHeroVStack>
				<ViewHeroCover
					renderPoster={() =>
						isFetchingTVShow || isTVShowLoading ? (
							<ViewHeroCoverDummyPoster />
						) : (
							<OverviewTabHeroPoster show={show} />
						)
					}
					renderBackdrop={() =>
						isFetchingTVShow || isTVShowLoading ? (
							<ViewHeroCoverDummyBackdrop />
						) : (
							<OverviewTabHeroBackdrop show={show} />
						)
					}
				/>

				<ViewHeroVStack px={2} pb={2}>
					{isFetchingTVShow || isTVShowLoading ? (
						<ViewHeroDummyTagline />
					) : tagline ? (
						<ViewHeroTagline tagline={tagline} />
					) : null}

					{isFetchingTVShow || isTVShowLoading ? (
						<ViewHeroDummyPlot />
					) : overview ? (
						<ViewHeroPlot plot={overview} />
					) : null}

					{isFetchingTVShow || isTVShowLoading ? (
						<ViewHeroDummyGenres />
					) : genres.length > 0 ? (
						<ViewHeroGenres mediaType='tv' genres={genres} />
					) : null}

					{isFetchingTVShow || isTVShowLoading ? (
						<ViewHeroDummyCrew label='Created By' />
					) : created_by.length > 0 ? (
						<ViewHeroCrew<'tv'> label='Created By' crew={created_by} />
					) : null}

					{isFetchingCredits || isCreditsLoading ? (
						<ViewHeroDummyCrew label='Directors' />
					) : directors.length > 0 ? (
						<ViewHeroCrew<'tv'>
							label={directors.length === 1 ? 'Director' : 'Directors'}
							crew={directors}
						/>
					) : null}

					{isFetchingCredits || isCreditsLoading ? (
						<ViewHeroDummyCrew label='Producers' />
					) : producers.length > 0 ? (
						<ViewHeroCrew<'tv'>
							label={producers.length === 1 ? 'Producer' : 'Producers'}
							crew={producers}
						/>
					) : null}

					{isFetchingCredits || isCreditsLoading ? (
						<ViewHeroDummyCrew label='Writers' />
					) : writers.length > 0 ? (
						<ViewHeroCrew<'tv'> label={writers.length === 1 ? 'Writer' : 'Writers'} crew={writers} />
					) : null}

					{isFetchingCredits || isCreditsLoading ? (
						<ViewHeroDummyCrew label='Executive Producers' />
					) : editors.length > 0 ? (
						<ViewHeroCrew<'tv'> label={editors.length === 1 ? 'Editor' : 'Editors'} crew={editors} />
					) : null}

					{isFetchingKeywords || isKeywordsLoading ? (
						<ViewHeroDummyKeywords />
					) : results.length > 0 ? (
						<ViewHeroKeywords mediaType='tv' keywords={results} />
					) : null}
				</ViewHeroVStack>
			</ViewHeroVStack>
		</ViewHero>
	);
};

export default OverviewTabHero;
