import { FC } from 'react';

import ViewInfo from '../../../../components/ViewInfo';
import ViewInfoDummyCertificationItem from '../../../../components/ViewInfo/components/ViewInfoDummyCertificationItem';
import ViewInfoDummyDateItem from '../../../../components/ViewInfo/components/ViewInfoDummyDateItem';
import ViewInfoDummyRuntimeItem from '../../../../components/ViewInfo/components/ViewInfoDummyRuntimeItem';
import ViewInfoDummyPopularityItem from '../../../../components/ViewInfo/components/ViewInfoDummyPopularityItem';
import ViewInfoDummyLanguagesItem from '../../../../components/ViewInfo/components/ViewInfoDummyLanguagesItem';

const TVShowsDummyInfo: FC = () => {
	return (
		<ViewInfo>
			<ViewInfoDummyCertificationItem key='ds-edb-tv-show-dummy-info-certification' />

			<ViewInfoDummyPopularityItem key='ds-edb-tv-show-dummy-info-popularity' />

			<ViewInfoDummyDateItem key='ds-edb-tv-show-dummy-info-date' />

			<ViewInfoDummyRuntimeItem key='ds-edb-tv-show-dummy-info-runtime' />

			<ViewInfoDummyLanguagesItem key='ds-edb-tv-show-dummy-info-languages' />
		</ViewInfo>
	);
};

export default TVShowsDummyInfo;
