import { FC, useState } from 'react';

import { useDebounce, useTheme, utils } from '@davidscicluna/component-library';

import { useMediaQuery, VStack, Center } from '@chakra-ui/react';

import { sort } from 'fast-sort';

import { useLayoutContext } from '../../../../../containers/Layout/common/hooks';
import {
	QueryEmpty,
	QueryEmptyStack,
	QueryEmptyBody,
	QueryEmptyTitle,
	QueryEmptySubtitle,
	VerticalGrid,
	LoadMore,
	CollectionHorizontalPoster,
	CollectionVerticalPoster
} from '../../../../../components';
import { useSelector, useUserTheme } from '../../../../../common/hooks';
import { getEmptySubtitle } from '../../../../../components/QueryEmpty/common/utils';
import { formatMediaTypeLabel } from '../../../../../common/utils';

const { getColor } = utils;

const limit = 20;

const RecentlyViewedCollections: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const { spacing } = useLayoutContext();

	const recentlyViewedCollections = useSelector(
		(state) => state.users.data.activeUser.data.recentlyViewed.collection
	);

	const [visible, secollectionisible] = useState<number>(limit);
	const visibleDebounced = useDebounce<number>(visible, 'slow');

	return recentlyViewedCollections.length === 0 ? (
		<QueryEmpty
			color={color}
			colorMode={colorMode}
			borderWidth='2px'
			borderStyle='dashed'
			borderColor={getColor({ theme, colorMode, type: 'divider' })}
			borderRadius='lg'
		>
			<QueryEmptyStack>
				<QueryEmptyBody>
					<QueryEmptyTitle />
					<QueryEmptySubtitle>
						{getEmptySubtitle({
							type: 'empty',
							label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'collection' })
						})}
					</QueryEmptySubtitle>
				</QueryEmptyBody>
			</QueryEmptyStack>
		</QueryEmpty>
	) : (
		<VStack width='100%' spacing={spacing}>
			<VerticalGrid>
				{({ displayMode }) =>
					sort(recentlyViewedCollections)
						.desc(({ addedAt }) => addedAt)
						.filter((_collection, index) => index < visibleDebounced)
						.map(({ mediaItem }) =>
							displayMode === 'list' ? (
								<CollectionHorizontalPoster key={mediaItem.id} collection={mediaItem} />
							) : (
								<CollectionVerticalPoster key={mediaItem.id} collection={mediaItem} />
							)
						)
				}
			</VerticalGrid>

			<Center width={isSm ? '100%' : 'auto'}>
				<LoadMore
					amount={visibleDebounced}
					total={recentlyViewedCollections.length}
					label={formatMediaTypeLabel({ type: 'multiple', mediaType: 'collection' })}
					isLoading={false}
					isButtonVisible={visibleDebounced <= recentlyViewedCollections.length}
					onClick={() => secollectionisible((total) => total + limit)}
				/>
			</Center>
		</VStack>
	);
};

export default RecentlyViewedCollections;
