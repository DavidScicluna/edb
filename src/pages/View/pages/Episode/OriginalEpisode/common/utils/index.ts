import { Undefinable } from '@davidscicluna/component-library';

import { memoize } from 'lodash';

import { Episode, PartialSeason } from '../../../../../../../common/types/tv';

type GetAdjacentEpisodeProps = { direction: 'prev' | 'next'; seasons: PartialSeason[]; episode?: Episode };
type GetAdjacentEpisodeReturn = Undefinable<{ season: number; episode: number }>;

export const getAdjacentEpisode = memoize(
	({ direction, seasons = [], episode }: GetAdjacentEpisodeProps): GetAdjacentEpisodeReturn => {
		const { season_number: episodeSeason, episode_number: episodeNumber } = episode || {};

		if (episodeSeason && episodeNumber) {
			const currentSeason = seasons.find(({ season_number: season }) => season === episodeSeason);

			if (currentSeason) {
				switch (direction) {
					case 'prev': {
						const prevSeason = seasons.find(({ season_number: season }) => season === episodeSeason - 1);
						const prevSeasonIndex = seasons.findIndex(
							({ season_number: season }) => season === episodeSeason - 1
						);

						return prevSeason && prevSeason.episode_count && prevSeasonIndex && episodeNumber === 1
							? { season: prevSeasonIndex, episode: prevSeason.episode_count }
							: episodeSeason >= 1
							? { season: episodeSeason, episode: episodeNumber - 1 }
							: undefined;
					}
					case 'next': {
						const nextSeason = seasons.find(({ season_number: season }) => season === episodeSeason + 1);
						const nextSeasonIndex = seasons.findIndex(
							({ season_number: season }) => season === episodeSeason + 1
						);

						return currentSeason.episode_count && episodeNumber < currentSeason.episode_count
							? { season: episodeSeason, episode: episodeNumber + 1 }
							: nextSeason && nextSeason.episode_count && nextSeasonIndex
							? { season: nextSeasonIndex, episode: 1 }
							: undefined;
					}
					default:
						return undefined;
				}
			}
		}

		return undefined;
	}
);
