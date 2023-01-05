import { FC } from 'react';

import ViewInfo from '../../../../components/ViewInfo';

import CollectionsDummyInfoDates from './components/CollectionsDummyInfoDates';
import CollectionsDummyInfoTotal from './components/CollectionsDummyInfoTotal';

const CollectionsDummyInfo: FC = () => {
	return (
		<ViewInfo>
			<CollectionsDummyInfoDates />
			<CollectionsDummyInfoTotal />
		</ViewInfo>
	);
};

export default CollectionsDummyInfo;
