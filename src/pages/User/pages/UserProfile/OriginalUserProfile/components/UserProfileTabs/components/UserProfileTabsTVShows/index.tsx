import { FC, useState } from 'react';

import { useTheme, useDebounce, utils } from '@davidscicluna/component-library';

import { useMediaQuery, VStack, Center } from '@chakra-ui/react';

import { sort } from 'fast-sort';

import { useLayoutContext } from '../../../../../../../../../containers/Layout/common/hooks';
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
} from '../../../../../../../../../components';
import { useUserTheme } from '../../../../../../../../../common/hooks';
import { getEmptySubtitle } from '../../../../../../../../../components/QueryEmpty/common/utils';
import { formatMediaTypeLabel } from '../../../../../../../../../common/utils';

import { UserProfileTabsTVShowsProps } from './types';

const { getColor } = utils;

const limit = 20;

const UserProfileTabsTVShows: FC<UserProfileTabsTVShowsProps> = ({ shows }) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const { spacing } = useLayoutContext();

	const [visible, setVisible] = useState<number>(limit);
	const visibleDebounced = useDebounce<number>(visible, 'slow');

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
			<VerticalGrid>
				{({ displayMode }) =>
					sort(shows)
						.desc(({ addedAt }) => addedAt)
						.filter((_show, index) => index < visibleDebounced)
						.map(({ mediaItem }) =>
							displayMode === 'list' ? (
								<TVShowHorizontalPoster key={mediaItem.id} show={mediaItem} />
							) : (
								<TVShowVerticalPoster key={mediaItem.id} show={mediaItem} />
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

export default UserProfileTabsTVShows;
