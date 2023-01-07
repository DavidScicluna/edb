import { FC } from 'react';

import ViewInfo from '../../../../components/ViewInfo';
import ViewInfoDummyCertificationItem from '../../../../components/ViewInfo/components/ViewInfoDummyCertificationItem';
import ViewInfoDummyDateItem from '../../../../components/ViewInfo/components/ViewInfoDummyDateItem';
import ViewInfoDummyLanguagesItem from '../../../../components/ViewInfo/components/ViewInfoDummyLanguagesItem';
import ViewInfoDummyPopularityItem from '../../../../components/ViewInfo/components/ViewInfoDummyPopularityItem';

import MoviesDummyInfoRuntime from './components/MoviesDummyInfoRuntime';
import MoviesDummyInfoCash from './components/MoviesDummyInfoCash';

const MoviesDummyInfo: FC = () => {
	return (
		<ViewInfo>
			<ViewInfoDummyCertificationItem key='ds-edb-movie-dummy-info-certification' />

			<ViewInfoDummyPopularityItem key='ds-edb-movie-dummy-info-popularity' />

			<ViewInfoDummyDateItem key='ds-edb-movie-dummy-info-date' />

			<MoviesDummyInfoRuntime key='ds-edb-movie-dummy-info-runtime' />

			<MoviesDummyInfoCash key='ds-edb-movie-dummy-info-cash-budget' type='budget' />

			<MoviesDummyInfoCash key='ds-edb-movie-dummy-info-cash-revenue' type='revenue' />

			<ViewInfoDummyLanguagesItem key='ds-edb-movie-dummy-info-languages' />
		</ViewInfo>
	);
};

export default MoviesDummyInfo;
