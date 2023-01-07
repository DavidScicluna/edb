import { FC } from 'react';

import ViewInfo from '../../../../components/ViewInfo';

import CollectionsDummyInfoDates from './components/CollectionsDummyInfoDates';
import CollectionsDummyInfoTotal from './components/CollectionsDummyInfoTotal';

const CollectionsDummyInfo: FC = () => {
	return (
		<ViewInfo>
			<CollectionsDummyInfoDates key='ds-edb-collection-dummy-info-dates' />
			<CollectionsDummyInfoTotal key='ds-edb-collection-dummy-info-total' />
		</ViewInfo>
	);
};

export default CollectionsDummyInfo;
