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
			<ViewInfoDummyCertificationItem />

			<ViewInfoDummyPopularityItem />

			<ViewInfoDummyDateItem />

			<MoviesDummyInfoRuntime />

			<MoviesDummyInfoCash type='budget' />

			<MoviesDummyInfoCash type='revenue' />

			<ViewInfoDummyLanguagesItem />
		</ViewInfo>
	);
};

export default MoviesDummyInfo;
