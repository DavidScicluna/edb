import { FC, useState } from 'react';

import { useTheme, useDebounce, utils } from '@davidscicluna/component-library';

import { useMediaQuery, VStack, Center } from '@chakra-ui/react';

import { sort } from 'fast-sort';

import { useLayoutContext } from '../../../../../../../../containers/Layout/common/hooks';
import {
	QueryEmpty,
	QueryEmptyStack,
	QueryEmptyBody,
	QueryEmptyTitle,
	QueryEmptySubtitle,
	VerticalGrid,
	LoadMore,
	MovieHorizontalPoster,
	MovieVerticalPoster
} from '../../../../../../../../components';
import { useUserTheme } from '../../../../../../../../common/hooks';
import { getEmptySubtitle } from '../../../../../../../../components/QueryEmpty/common/utils';
import { formatMediaTypeLabel } from '../../../../../../../../common/utils';

import { UserProfileTabsMoviesProps } from './types';

const { getColor } = utils;

const limit = 20;

const UserProfileTabsMovies: FC<UserProfileTabsMoviesProps> = ({ movies }) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const { spacing } = useLayoutContext();

	const [visible, setVisible] = useState<number>(limit);
	const visibleDebounced = useDebounce<number>(visible, 'slow');

	return movies && movies.length === 0 ? (
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
							label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'movie' })
						})}
					</QueryEmptySubtitle>
				</QueryEmptyBody>
			</QueryEmptyStack>
		</QueryEmpty>
	) : (
		<VStack width='100%' spacing={spacing}>
			<VerticalGrid spacing={spacing}>
				{({ displayMode }) =>
					sort(movies)
						.desc((movie) => movie.addedAt)
						.filter((_movie, index) => index <= visibleDebounced)
						.map((movie) =>
							displayMode === 'list' ? (
								<MovieHorizontalPoster key={movie.mediaItem.id} movie={movie.mediaItem} />
							) : (
								<MovieVerticalPoster key={movie.mediaItem.id} movie={movie.mediaItem} />
							)
						)
				}
			</VerticalGrid>

			<Center width={isSm ? '100%' : 'auto'}>
				<LoadMore
					amount={visibleDebounced}
					total={movies.length}
					label={formatMediaTypeLabel({ type: 'multiple', mediaType: 'movie' })}
					isLoading={false}
					isButtonVisible={visibleDebounced <= movies.length}
					onClick={() => setVisible((total) => total + limit)}
				/>
			</Center>
		</VStack>
	);
};

export default UserProfileTabsMovies;
