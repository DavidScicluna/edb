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
import { Certification } from '../../../../../../../common/types';

import { MovieInfoProps } from './types';
import MovieInfoCash from './components/MovieInfoCash';

const MovieInfo: FC<MovieInfoProps> = ({ movie }) => {
	const { popularity, release_date, release_dates, runtime, budget, revenue, spoken_languages = [] } = movie;

	const [certification, setCertification] = useState<Undefinable<Certification>>();

	const handleGetCertification = useCallback(
		debounce((): void => {
			const certification = (release_dates?.results || []).find(({ iso_3166_1 }) => iso_3166_1 === 'US');

			if (certification && certification?.release_dates && certification?.release_dates[0]) {
				return setCertification(certification?.release_dates[0]);
			}
		}, 250),
		[release_dates]
	);

	useUpdateEffect(() => handleGetCertification(), [release_dates]);

	return (
		<ViewInfo>
			{compact([
				certification ? (
					<ViewInfoCertificationItem
						{...certification}
						key='ds-edb-movie-info-certification'
						mediaType='movie'
					/>
				) : null,

				popularity ? (
					<ViewInfoPopularityItem key='ds-edb-movie-info-popularity' popularity={popularity} />
				) : null,

				release_date ? (
					<ViewInfoDateItem key='ds-edb-movie-info-date' mediaType='movie' startDate={release_date} />
				) : null,

				runtime ? (
					<ViewInfoRuntimeItem key='ds-edb-movie-info-runtime' mediaType='movie' runtime={runtime} />
				) : null,

				budget ? <MovieInfoCash key='ds-edb-movie-info-cash-budget' type='budget' cash={budget} /> : null,

				revenue ? <MovieInfoCash key='ds-edb-movie-info-cash-revenue' type='revenue' cash={revenue} /> : null,

				spoken_languages.length > 0 ? (
					<ViewInfoLanguagesItem key='ds-edb-movie-info-languages' languages={spoken_languages} />
				) : null
			])}
		</ViewInfo>
	);
};

export default MovieInfo;
