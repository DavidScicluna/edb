import { FC } from 'react';

import { compact, range } from 'lodash';

import { useTVShowSeasonQuery } from '../../../../../../../../../common/queries';
import ViewDummyEpisode from '../../../../../../../components/ViewDummyEpisode';
import ViewEpisode from '../../../../../../../components/ViewEpisode';
import { VerticalGrid } from '../../../../../../../../../components';
import { useLayoutContext } from '../../../../../../../../../containers/Layout/common/hooks';

import { EpisodesTabSeasonProps } from './types';

const EpisodesTabSeason: FC<EpisodesTabSeasonProps> = ({ id, season: seasonNumber }) => {
	const { spacing } = useLayoutContext();

	const {
		data: season,
		isFetching,
		isLoading,
		isError,
		isSuccess
	} = useTVShowSeasonQuery({
		props: { id, season: seasonNumber }
	});

	const { episodes = [] } = season || {};

	return !isError && (isFetching || isLoading) ? (
		<VerticalGrid displayMode='list'>
			{() => range(20).map((_dummy, index) => <ViewDummyEpisode key={index} hasDate hasOverview />)}
		</VerticalGrid>
	) : !isError && isSuccess && !!season ? (
		<VerticalGrid displayMode='list'>
			{() =>
				episodes.map((episode) => (
					<ViewEpisode
						key={episode.id}
						episode={episode}
						badgeLabel={compact([
							episode.season_number ? `S${episode.season_number}` : null,
							episode.episode_number ? `E${episode.episode_number}` : null
						]).join(' • ')}
					/>
				))
			}
		</VerticalGrid>
	) : null;
};

export default EpisodesTabSeason;
