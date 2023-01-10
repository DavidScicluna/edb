import { FC, useState } from 'react';

import { compact } from 'lodash';
import { useUpdateEffect } from 'usehooks-ts';

import ViewInfo from '../../../../../components/ViewInfo';
import { getCertification } from '../../../../../common/utils';
import ViewInfoRuntimeItem from '../../../../../components/ViewInfo/components/ViewInfoRuntimeItem';
import ViewInfoPopularityItem from '../../../../../components/ViewInfo/components/ViewInfoPopularityItem';
import ViewInfoDateItem from '../../../../../components/ViewInfo/components/ViewInfoDateItem';
import ViewInfoLanguagesItem from '../../../../../components/ViewInfo/components/ViewInfoLanguagesItem';
import ViewInfoCertificationItem from '../../../../../components/ViewInfo/components/ViewInfoCertificationItem';

import { MovieInfoProps } from './types';
import MovieInfoCash from './components/MovieInfoCash';

const MovieInfo: FC<MovieInfoProps> = ({ movie }) => {
	const { popularity, release_date, release_dates, runtime, budget, revenue, spoken_languages = [] } = movie;

	const [certification, setCertification] = useState(
		getCertification({ certifications: release_dates?.results || [] })
	);

	useUpdateEffect(() => {
		setCertification(getCertification({ certifications: release_dates?.results || [] }));
	}, [release_dates]);

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
					<ViewInfoDateItem key='ds-edb-movie-info-date' mediaType='movie' date={release_date} />
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
