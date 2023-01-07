import { FC, useState, useEffect } from 'react';

import { Undefinable } from '@davidscicluna/component-library';

import { compact } from 'lodash';

import ViewInfo from '../../../../../components/ViewInfo';
import { FullMovie } from '../../../../../../../common/types/movie';
import { getCollectionFirstLastParts } from '../../common/utils';

import { CollectionInfoProps } from './types';
import CollectionInfoTotal from './components/CollectionInfoTotal';
import CollectionInfoDates from './components/CollectionInfoDates';

const CollectionInfo: FC<CollectionInfoProps> = ({ collection }) => {
	const { parts = [] } = collection;

	const [first, setFirst] = useState<Undefinable<FullMovie>>();
	const [last, setLast] = useState<Undefinable<FullMovie>>();

	const handleGetFirstLastParts = (): void => {
		const { first, last } = getCollectionFirstLastParts({ parts });

		if (first) {
			setFirst(first);
		}
		if (last) {
			setLast(last);
		}
	};

	useEffect(() => handleGetFirstLastParts(), [parts]);

	return (
		<ViewInfo>
			{compact([
				first ? <CollectionInfoDates key='ds-edb-collection-info-dates' first={first} last={last} /> : null,
				parts.length > 0 ? <CollectionInfoTotal key='ds-edb-collection-info-total' parts={parts} /> : null
			])}
		</ViewInfo>
	);
};

export default CollectionInfo;
