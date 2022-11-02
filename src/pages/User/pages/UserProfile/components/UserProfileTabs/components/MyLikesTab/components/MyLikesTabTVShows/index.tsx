import { FC, useState } from 'react';

import { useTheme, utils } from '@davidscicluna/component-library';

import { useMediaQuery, VStack, Center } from '@chakra-ui/react';

import { sort } from 'fast-sort';
import { useDebounce } from 'usehooks-ts';

import { useLayoutContext } from '../../../../../../../../../../containers/Layout/common/hooks';
import {
	QueryEmpty,
	QueryEmptyStack,
	QueryEmptyBody,
	QueryEmptyTitle,
	QueryEmptySubtitle,
	VerticalGrid,
	LoadMore,
	TVShowHorizontalPoster,
	TVShowVerticalPoster
} from '../../../../../../../../../../components';
import { useUserTheme, useSelector } from '../../../../../../../../../../common/hooks';
import { getEmptySubtitle } from '../../../../../../../../../../components/QueryEmpty/common/utils';
import { formatMediaTypeLabel } from '../../../../../../../../../../common/utils';

const { getColor } = utils;

const limit = 20;

const MyLikesTabTVShows: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const { spacing } = useLayoutContext();

	const shows = useSelector((state) => state.users.data.activeUser.data.liked.tv || []);

	const [visible, setVisible] = useState<number>(limit);
	const visibleDebounced = useDebounce<number>(visible, 500);

	return shows && shows.length === 0 ? (
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
							label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'tv' })
						})}
					</QueryEmptySubtitle>
				</QueryEmptyBody>
			</QueryEmptyStack>
		</QueryEmpty>
	) : (
		<VStack width='100%' spacing={spacing}>
			<VerticalGrid spacing={spacing}>
				{({ displayMode }) =>
					sort(shows)
						.desc((show) => show.addedAt)
						.filter((_show, index) => index <= visibleDebounced)
						.map((show) =>
							displayMode === 'list' ? (
								<TVShowHorizontalPoster key={show.mediaItem.id} show={show.mediaItem} />
							) : (
								<TVShowVerticalPoster key={show.mediaItem.id} show={show.mediaItem} />
							)
						)
				}
			</VerticalGrid>

			<Center width={isSm ? '100%' : 'auto'}>
				<LoadMore
					amount={visibleDebounced}
					total={shows.length}
					label={formatMediaTypeLabel({ type: 'multiple', mediaType: 'tv' })}
					isLoading={false}
					isButtonVisible={visibleDebounced <= shows.length}
					onClick={() => setVisible((total) => total + limit)}
				/>
			</Center>
		</VStack>
	);
};

export default MyLikesTabTVShows;
