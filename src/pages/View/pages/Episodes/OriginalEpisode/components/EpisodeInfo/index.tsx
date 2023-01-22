import { FC, useState, useCallback, useEffect } from 'react';

import { Undefinable } from '@davidscicluna/component-library';

import { compact, debounce } from 'lodash';

import ViewInfo from '../../../../../components/ViewInfo';
import { useEpisodeContext } from '../../common/hooks';
import { TVShowContentRating } from '../../../../../../../common/types/tv';
import ViewInfoCertificationItem from '../../../../../components/ViewInfo/components/ViewInfoCertificationItem';
import ViewInfoRuntimeItem from '../../../../../components/ViewInfo/components/ViewInfoRuntimeItem';

import EpisodeInfoDate from './components/EpisodeInfoDate';
import EpisodeInfoNumbers from './components/EpisodeInfoNumbers';
import { EpisodeInfoProps } from './types';

const EpisodeInfo: FC<EpisodeInfoProps> = ({ episode }) => {
	const { showQuery } = useEpisodeContext();

	const { data: show } = showQuery || {};
	const { name, content_ratings } = show || {};

	const { air_date, season_number, episode_number, runtime } = episode;

	const [certification, setCertification] = useState<Undefinable<TVShowContentRating>>();

	const handleGetCertification = useCallback(
		debounce((): void => {
			const certification = (content_ratings?.results || []).find(({ iso_3166_1 }) => iso_3166_1 === 'US');

			if (certification && certification) {
				return setCertification(certification);
			}
		}, 250),
		[content_ratings]
	);

	useEffect(() => handleGetCertification(), [content_ratings]);

	return (
		<ViewInfo>
			{compact([
				certification ? (
					<ViewInfoCertificationItem
						key='ds-edb-episode-info-certification'
						mediaType='tv'
						certification={certification.rating}
					/>
				) : null,

				air_date ? <EpisodeInfoDate key='ds-edb-episode-info-date' air_date={air_date} /> : null,

				season_number && episode_number ? (
					<EpisodeInfoNumbers
						key='ds-edb-episode-info-numbers'
						name={name}
						season_number={season_number}
						episode_number={episode_number}
					/>
				) : null,

				runtime ? (
					<ViewInfoRuntimeItem key='ds-edb-episode-info-runtime' mediaType='tv' runtime={runtime} />
				) : null
			])}
		</ViewInfo>
	);
};

export default EpisodeInfo;
