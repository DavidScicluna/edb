import { FC } from 'react';

import ViewInfo from '../../../../components/ViewInfo';
import ViewInfoDummyPopularityItem from '../../../../components/ViewInfo/components/ViewInfoDummyPopularityItem';

import PersonsDummyInfoDate from './components/PersonsDummyInfoDate';
import PersonsDummyInfoDepartments from './components/PersonsDummyInfoDepartments';

const PersonsDummyInfo: FC = () => {
	return (
		<ViewInfo>
			<ViewInfoDummyPopularityItem key='ds-edb-person-dummy-info-popularity' />

			<PersonsDummyInfoDate key='ds-edb-person-dummy-info-date' />

			<PersonsDummyInfoDepartments key='ds-edb-person-dummy-info-departments' />
		</ViewInfo>
	);
};

export default PersonsDummyInfo;
