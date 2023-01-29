import { FC, useState } from 'react';

import {
	Undefinable,
	useDebounce,
	Card,
	CardHeader,
	CardBody,
	Badge,
	BadgeIcon,
	BadgeLabel
} from '@davidscicluna/component-library';

import { Text } from '@chakra-ui/react';

import { sort } from 'fast-sort';
import numbro from 'numbro';

import { useUserTheme } from '../../../../../../../../../common/hooks';
import { useMediaTypeQuery } from '../../../../../../../../../common/queries';
import { CollectionHorizontalPoster } from '../../../../../../../../../components';
import { formatMediaTypeLabel } from '../../../../../../../../../common/utils';
import DummyOverviewTabCollection from '../../../../../components/DummyOverviewTab/components/DummyOverviewTabCollection';
import { useMovieContext } from '../../../../common/hooks';

import { OverviewTabCollectionProps } from './types';

const OverviewTabCollection: FC<OverviewTabCollectionProps> = ({ id: collectionID }) => {
	const { colorMode } = useUserTheme();

	const { movieQuery } = useMovieContext();

	const { data: movie } = movieQuery || {};
	const { id: movieID } = movie || {};

	const [index, setIndex] = useState<Undefinable<number>>();
	const indexDebounced = useDebounce<Undefinable<number>>(index);

	const {
		data: collection,
		isFetching,
		isLoading,
		isError
	} = useMediaTypeQuery<'collection'>({
		props: { mediaType: 'collection', id: Number(collectionID) },
		options: {
			enabled: !!collectionID,
			onSuccess: ({ parts = [] }) => {
				setIndex(
					sort([...parts])
						.asc(({ release_date }) => release_date)
						.findIndex(({ id }) => id === movieID)
				);
			}
		}
	});

	return !isError && (isFetching || isLoading) ? (
		<DummyOverviewTabCollection />
	) : !isError && !!collection ? (
		<Card colorMode={colorMode} isFullWidth p={2}>
			<CardHeader
				renderTitle={(props) => (
					<Text {...props}>
						{`Part of the ${
							collection?.name
								? collection?.name
								: formatMediaTypeLabel({ type: 'single', mediaType: 'collection' })
						}`}
					</Text>
				)}
				actions={
					indexDebounced && indexDebounced >= 0 ? (
						<Badge colorMode={colorMode} size='xs' variant='outlined'>
							<BadgeIcon icon='tag' category='outlined' />
							<BadgeLabel>
								{`${numbro(indexDebounced + 1).format({
									output: 'ordinal'
								})} ${formatMediaTypeLabel({
									type: 'single',
									mediaType: 'movie'
								})} in the ${formatMediaTypeLabel({
									type: 'single',
									mediaType: 'collection'
								})}`}
							</BadgeLabel>
						</Badge>
					) : undefined
				}
			/>
			<CardBody>
				<CollectionHorizontalPoster collection={collection} />
			</CardBody>
		</Card>
	) : null;
};

export default OverviewTabCollection;
