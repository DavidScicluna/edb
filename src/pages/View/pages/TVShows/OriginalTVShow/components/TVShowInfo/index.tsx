import { FC, useState, useCallback } from 'react';

import { Undefinable } from '@davidscicluna/component-library';

import { compact, debounce } from 'lodash';
import { useUpdateEffect } from 'usehooks-ts';

import ViewInfo from '../../../../../components/ViewInfo';
import ViewInfoRuntimeItem from '../../../../../components/ViewInfo/components/ViewInfoRuntimeItem';
import ViewInfoPopularityItem from '../../../../../components/ViewInfo/components/ViewInfoPopularityItem';
import ViewInfoDateItem from '../../../../../components/ViewInfo/components/ViewInfoDateItem';
import ViewInfoLanguagesItem from '../../../../../components/ViewInfo/components/ViewInfoLanguagesItem';
import ViewInfoCertificationItem from '../../../../../components/ViewInfo/components/ViewInfoCertificationItem';
import { TVShowContentRating } from '../../../../../../../common/types/tv';

import { TVShowInfoProps } from './types';

const TVShowInfo: FC<TVShowInfoProps> = ({ show }) => {
	const {
		popularity,
		first_air_date,
		last_air_date,
		content_ratings,
		episode_run_time: runtimes = [],
		spoken_languages = []
	} = show;

	const [certification, setCertification] = useState<Undefinable<TVShowContentRating>>();

	const handleGetCertification = useCallback(
		debounce((): void => {
			const certification = (content_ratings?.results || []).find(({ iso_3166_1 }) => iso_3166_1 === 'US');

			if (certification) {
				return setCertification(certification);
			}
		}, 250),
		[content_ratings]
	);

	useUpdateEffect(() => handleGetCertification(), [content_ratings]);

	return (
		<ViewInfo>
			{compact([
				certification ? (
					<ViewInfoCertificationItem
						key='ds-edb-tv-show-info-certification'
						mediaType='tv'
						certification={certification.rating}
					/>
				) : null,

				popularity ? (
					<ViewInfoPopularityItem key='ds-edb-tv-show-info-popularity' popularity={popularity} />
				) : null,

				first_air_date ? (
					<ViewInfoDateItem
						key='ds-edb-tv-show-info-date'
						mediaType='tv'
						startDate={first_air_date}
						endDate={last_air_date}
					/>
				) : null,

				runtimes.length > 0 ? (
					<ViewInfoRuntimeItem
						key='ds-edb-tv-show-info-runtime'
						mediaType='tv'
						runtime={runtimes.reduce((a, b) => a + b, 0) / (runtimes.length || 0)}
					/>
				) : null,

				spoken_languages.length > 0 ? (
					<ViewInfoLanguagesItem key='ds-edb-tv-show-info-languages' languages={spoken_languages} />
				) : null
			])}
		</ViewInfo>
	);
};

export default TVShowInfo;
