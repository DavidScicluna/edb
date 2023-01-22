import { Undefinable } from '@davidscicluna/component-library';

import { memoize } from 'lodash';

import { Episode, PartialSeason } from '../../../../../../../common/types/tv';

type GetAdjacentEpisodeProps = { direction: 'prev' | 'next'; seasons: PartialSeason[]; episode?: Episode };
type GetAdjacentEpisodeReturn = Undefinable<{ season: number; episode: number }>;

export const getAdjacentEpisode = memoize(
	({ direction, seasons = [], episode }: GetAdjacentEpisodeProps): GetAdjacentEpisodeReturn => {
		const { season_number: episodeSeason, episode_number: episodeNumber } = episode || {};

		if (episodeSeason && episodeNumber) {
			const prevSeason = seasons.find((_season, index) => episodeSeason - 1 === index + 1);
			const prevSeasonIndex = seasons.findIndex((_season, index) => episodeSeason - 1 === index + 1);
			const currentSeason = seasons.find((_season, index) => episodeSeason === index + 1);
			const nextSeason = seasons.find((_season, index) => episodeSeason + 1 === index + 1);
			const nextSeasonIndex = seasons.findIndex((_season, index) => episodeSeason + 1 === index + 1);

			if (currentSeason) {
				switch (direction) {
					case 'prev': {
						return prevSeason && prevSeason.episode_count && prevSeasonIndex && episodeNumber === 1
							? { season: prevSeasonIndex, episode: prevSeason.episode_count }
							: { season: episodeSeason, episode: episodeNumber - 1 };
					}
					case 'next': {
						return nextSeason && nextSeason.episode_count && nextSeasonIndex && episodeNumber === 1
							? { season: nextSeasonIndex, episode: nextSeason.episode_count }
							: { season: episodeSeason, episode: episodeNumber + 1 };
					}
					default:
						return undefined;
				}
			}
		}

		return undefined;
	}
);
