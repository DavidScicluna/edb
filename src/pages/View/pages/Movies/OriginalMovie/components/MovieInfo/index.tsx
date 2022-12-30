import { FC, useState } from 'react';

import { compact } from 'lodash';
import { useUpdateEffect } from 'usehooks-ts';

import ViewInfo from '../../../../../components/ViewInfo';
import { getCertification } from '../../../../../common/utils';
import ViewInfoPopularityItem from '../../../../../components/ViewInfo/components/ViewInfoPopularityItem';
import ViewInfoDateItem from '../../../../../components/ViewInfo/components/ViewInfoDateItem';
import ViewInfoLanguagesItem from '../../../../../components/ViewInfo/components/ViewInfoLanguagesItem';
import ViewInfoCertificationItem from '../../../../../components/ViewInfo/components/ViewInfoCertificationItem';

import { MovieInfoProps } from './types';
import MovieInfoRuntime from './components/MovieInfoRuntime';
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
				certification ? <ViewInfoCertificationItem {...certification} mediaType='movie' /> : null,

				popularity ? <ViewInfoPopularityItem popularity={popularity} /> : null,

				release_date ? <ViewInfoDateItem mediaType='movie' date={release_date} /> : null,

				runtime ? <MovieInfoRuntime runtime={runtime} /> : null,

				budget ? <MovieInfoCash type='budget' cash={budget} /> : null,

				revenue ? <MovieInfoCash type='revenue' cash={revenue} /> : null,

				spoken_languages.length > 0 ? <ViewInfoLanguagesItem languages={spoken_languages} /> : null
			])}
		</ViewInfo>
	);
};

export default MovieInfo;
