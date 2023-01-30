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
	PersonHorizontalPoster,
	PersonVerticalPoster
} from '../../../../../components';
import { useSelector, useUserTheme } from '../../../../../common/hooks';
import { getEmptySubtitle } from '../../../../../components/QueryEmpty/common/utils';
import { formatMediaTypeLabel } from '../../../../../common/utils';

const { getColor } = utils;

const limit = 20;

const RecentlyViewedPeople: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const { spacing } = useLayoutContext();

	const recentlyViewedPeople = useSelector((state) => state.users.data.activeUser.data.recentlyViewed.person);

	const [visible, sepersonisible] = useState<number>(limit);
	const visibleDebounced = useDebounce<number>(visible, 'slow');

	return recentlyViewedPeople.length === 0 ? (
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
							label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'person' })
						})}
					</QueryEmptySubtitle>
				</QueryEmptyBody>
			</QueryEmptyStack>
		</QueryEmpty>
	) : (
		<VStack width='100%' spacing={spacing}>
			<VerticalGrid>
				{({ displayMode }) =>
					sort(recentlyViewedPeople)
						.desc(({ addedAt }) => addedAt)
						.filter((_person, index) => index < visibleDebounced)
						.map(({ mediaItem }) =>
							displayMode === 'list' ? (
								<PersonHorizontalPoster key={mediaItem.id} person={mediaItem} />
							) : (
								<PersonVerticalPoster key={mediaItem.id} person={mediaItem} />
							)
						)
				}
			</VerticalGrid>

			<Center width={isSm ? '100%' : 'auto'}>
				<LoadMore
					amount={visibleDebounced}
					total={recentlyViewedPeople.length}
					label={formatMediaTypeLabel({ type: 'multiple', mediaType: 'person' })}
					isLoading={false}
					isButtonVisible={visibleDebounced <= recentlyViewedPeople.length}
					onClick={() => sepersonisible((total) => total + limit)}
				/>
			</Center>
		</VStack>
	);
};

export default RecentlyViewedPeople;
