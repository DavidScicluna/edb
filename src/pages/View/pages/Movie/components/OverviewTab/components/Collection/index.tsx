import { ReactElement } from 'react';

import { Card, CardHeader, CardBody } from '@davidscicluna/component-library';

import { Text } from '@chakra-ui/react';
import capitalize from 'lodash/capitalize';
import compact from 'lodash/compact';

import HorizontalCollectionPoster from '../../../../../../../Search/components/All/components/Collections/components/Poster/Horizontal';

import { CollectionProps } from './types';

const Collection = ({ collection }: CollectionProps): ReactElement => {
	const handleReturnFormattedTitle = (name: string): string => {
		return compact(name.toLowerCase().replace('collection', '').split(' ')).join(' ');
	};

	return (
		<Card isFullWidth>
			<CardHeader
				renderTitle={(props) => (
					<Text {...props}>
						{`Part of the ${
							collection?.name
								? `"${capitalize(handleReturnFormattedTitle(collection.name))}" Collection`
								: 'Collection'
						}`}
					</Text>
				)}
			/>
			<CardBody>
				<HorizontalCollectionPoster collection={collection} isLoading={false} />
			</CardBody>
		</Card>
	);
};

export default Collection;
