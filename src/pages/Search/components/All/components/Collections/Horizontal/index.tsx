import { ReactElement } from 'react';

import { useMediaQuery } from '@chakra-ui/react';

import qs from 'query-string';

import { CollectionsProps } from './types';

import { useSelector } from '../../../../../../../common/hooks';
import Button from '../../../../../../../components/Clickable/Button';
import Link from '../../../../../../../components/Clickable/Link';
import HorizontalGrid from '../../../../../../../components/Grid/Horizontal/Default';
import VerticalCollectionPoster from '../components/Poster/Vertical';

const Collections = ({ query, collections = [], total = 0 }: CollectionsProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const color = useSelector((state) => state.user.ui.theme.color);

	return (
		<HorizontalGrid
			title={`Found ${total} collection${total === 0 || total > 1 ? 's' : ''} with "${query}"`}
			footer={
				total > 20 ? (
					<Link to={{ pathname: '/search', search: qs.stringify({ query }), hash: 'collection' }} isFullWidth>
						<Button color={color} isFullWidth size={isSm ? 'sm' : 'md'} variant='text'>
							{`View all ${total} collection${total === 0 || total > 1 ? 's' : ''} with "${query}"`}
						</Button>
					</Link>
				) : undefined
			}
		>
			{collections.map((collection) => (
				<VerticalCollectionPoster
					key={collection.id}
					width={['185px', '205px', '230px']}
					collection={collection}
					isLoading={false}
				/>
			))}
		</HorizontalGrid>
	);
};

export default Collections;