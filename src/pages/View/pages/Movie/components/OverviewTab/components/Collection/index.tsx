import { ReactElement } from 'react';

import capitalize from 'lodash/capitalize';
import compact from 'lodash/compact';

import { CollectionProps } from './types';

import Panel from '../../../../../../../../components/Panel';
import HorizontalCollectionPoster from '../../../../../../../Search/components/All/components/Collections/components/Poster/Horizontal';

const Collection = ({ collection }: CollectionProps): ReactElement => {
	const handleReturnFormattedTitle = (name: string): string => {
		return compact(name.toLowerCase().replace('collection', '').split(' ')).join(' ');
	};

	return (
		<Panel isFullWidth>
			{{
				header: {
					title: `Part of the ${
						collection?.name
							? `"${capitalize(handleReturnFormattedTitle(collection.name))}" Collection`
							: 'Collection'
					}`
				},
				body: <HorizontalCollectionPoster collection={collection} isLoading={false} />
			}}
		</Panel>
	);
};

export default Collection;
