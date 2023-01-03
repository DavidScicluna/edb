import { FC } from 'react';

import { Card, CardHeader, CardBody } from '@davidscicluna/component-library';

import { Text } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../../../../../common/hooks';
import { useMediaTypeQuery } from '../../../../../../../../../common/queries';
import { CollectionHorizontalPoster } from '../../../../../../../../../components';
import { useMovieContext } from '../../../../common/hooks';
import { formatMediaTypeLabel } from '../../../../../../../../../common/utils';
import DummyOverviewTabCollection from '../../../../../components/DummyOverviewTab/components/DummyOverviewTabCollection';

const OverviewTabCollection: FC = () => {
	const { colorMode } = useUserTheme();

	const { movieQuery } = useMovieContext();

	const { data: movie } = movieQuery || {};
	const { belongs_to_collection: partialCollection } = movie || {};

	const {
		data: fullCollection,
		isFetching,
		isLoading,
		isError
	} = useMediaTypeQuery<'collection'>({
		props: { mediaType: 'collection', id: Number(partialCollection?.id) },
		options: { enabled: !!partialCollection?.id }
	});

	return !isError && (isFetching || isLoading) ? (
		<DummyOverviewTabCollection />
	) : fullCollection ? (
		<Card colorMode={colorMode} isFullWidth p={2}>
			<CardHeader
				renderTitle={(props) => (
					<Text {...props}>
						{fullCollection?.name
							? fullCollection?.name
							: formatMediaTypeLabel({ type: 'single', mediaType: 'collection' })}
					</Text>
				)}
				renderSubtitle={(props) => (
					<Text {...props}>
						{`${formatMediaTypeLabel({ type: 'single', mediaType: 'movie' })} is part of the ${
							fullCollection?.name
								? fullCollection?.name
								: formatMediaTypeLabel({ type: 'single', mediaType: 'collection' })
						}`}
					</Text>
				)}
			/>
			<CardBody>
				<CollectionHorizontalPoster collection={fullCollection} />
			</CardBody>
		</Card>
	) : null;
};

export default OverviewTabCollection;
