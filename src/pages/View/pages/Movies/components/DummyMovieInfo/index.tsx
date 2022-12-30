import { FC } from 'react';

import ViewInfo from '../../../../components/ViewInfo';
import ViewInfoDummyCertificationItem from '../../../../components/ViewInfo/components/ViewInfoDummyCertificationItem';
import ViewInfoDummyDateItem from '../../../../components/ViewInfo/components/ViewInfoDummyDateItem';
import ViewInfoDummyLanguagesItem from '../../../../components/ViewInfo/components/ViewInfoDummyLanguagesItem';
import ViewInfoDummyPopularityItem from '../../../../components/ViewInfo/components/ViewInfoDummyPopularityItem';

import DummyMovieInfoRuntime from './components/DummyMovieInfoRuntime';
import DummyMovieInfoCash from './components/DummyMovieInfoCash';

const DummyMovieInfo: FC = () => {
	return (
		<ViewInfo>
			<ViewInfoDummyCertificationItem />

			<ViewInfoDummyPopularityItem />

			<ViewInfoDummyDateItem />

			<DummyMovieInfoRuntime />

			<DummyMovieInfoCash type='budget' />

			<DummyMovieInfoCash type='revenue' />

			<ViewInfoDummyLanguagesItem />
		</ViewInfo>
	);
};

export default DummyMovieInfo;
