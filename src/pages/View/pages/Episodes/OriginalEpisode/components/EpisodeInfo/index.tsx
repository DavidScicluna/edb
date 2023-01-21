import { FC } from 'react';

import { compact } from 'lodash';

import ViewInfo from '../../../../../components/ViewInfo';

import EpisodeInfoDate from './components/EpisodeInfoDate';
import EpisodeInfoNumbers from './components/EpisodeInfoNumbers';
import { EpisodeInfoProps } from './types';

const EpisodeInfo: FC<EpisodeInfoProps> = ({ episode }) => {
	const { air_date, season_number, episode_number } = episode;

	return (
		<ViewInfo>
			{compact([
				air_date ? <EpisodeInfoDate key='ds-edb-episode-info-date' air_date={air_date} /> : null,

				season_number && episode_number ? (
					<EpisodeInfoNumbers
						key='ds-edb-episode-info-numbers'
						season_number={season_number}
						episode_number={episode_number}
					/>
				) : null
			])}
		</ViewInfo>
	);
};

export default EpisodeInfo;
