import { ReactElement, useState } from 'react';

import { useTheme, useDebounce, Button, Icon } from '@davidscicluna/component-library';

import { Text } from '@chakra-ui/react';

import { compact, range, uniqBy } from 'lodash';
import { sort } from 'fast-sort';

import width from '../../../../../components/Posters/common/data/width';
import { useUserTheme } from '../../../../../common/hooks';
import {
	HorizontalGrid,
	HorizontalGridHeader,
	HorizontalGridBody,
	HorizontalGridScroll,
	QueryEmpty,
	QueryEmptyStack,
	QueryEmptyIcon,
	QueryEmptyBody,
	QueryEmptyTitle,
	QueryEmptySubtitle,
	QueryEmptyActions,
	DummyVerticalPoster,
	MovieVerticalPoster,
	TVShowVerticalPoster
} from '../../../../../components';
import { getEmptySubtitle } from '../../../../../components/QueryEmpty/common/utils';
import { formatMediaTypeLabel } from '../../../../../common/utils';
import { useMediaTypeSimilarQuery } from '../../../../../common/queries';
import { ViewSimilarMediaType } from '../common/types';

import { ViewSimilarProps, ViewSimilarGetMediaItemType } from './types';

const ViewSimilar = <MT extends ViewSimilarMediaType>(props: ViewSimilarProps<MT>): ReactElement => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const { mediaType, mediaItem } = props;
	const { id } = mediaItem || {};

	const [mediaItems, setMediaItems] = useState<ViewSimilarGetMediaItemType<MT>[]>([]);
	const mediaItemsDebounced = useDebounce<ViewSimilarGetMediaItemType<MT>[]>(mediaItems, 'slow');

	const { isFetching, isLoading, isError, refetch } = useMediaTypeSimilarQuery<MT>({
		props: { mediaType, id: Number(id) },
		options: {
			enabled: !!id,
			onSuccess: ({ results = [] }) => {
				setMediaItems(
					uniqBy(
						sort([...results]).by([
							{ desc: ({ vote_count }) => vote_count },
							{ desc: ({ vote_average }) => vote_average },
							{ desc: ({ popularity }) => popularity }
						]),
						'id'
					).filter((_mediaItem, index) => index < 20)
				);
			}
		}
	});

	return (
		// TODO: Go over all HorizontalGrid and disabled if loading or error or not items
		<HorizontalGrid
			colorMode={colorMode}
			isDisabled={mediaItemsDebounced.length === 0 || isFetching || isLoading}
			isFullWidth
			spacing={2}
			p={2}
		>
			<HorizontalGridHeader
				renderTitle={(props) => (
					<Text {...props}>{`Similar ${formatMediaTypeLabel({ type: 'multiple', mediaType })}`}</Text>
				)}
				renderSubtitle={(props) => (
					<Text {...props}>
						{`This list is showcasing the most popular ${formatMediaTypeLabel({
							type: 'multiple',
							mediaType
						})} that are similar to the ${formatMediaTypeLabel({ type: 'single', mediaType })}`}
					</Text>
				)}
				arrowProps={{ variant: 'icon' }}
				spacing={0}
			/>
			<HorizontalGridBody>
				{!(isFetching || isLoading) && isError ? (
					<QueryEmpty color={color} colorMode={colorMode}>
						<QueryEmptyStack>
							<QueryEmptyIcon
								renderIcon={(props) => (
									<Icon
										{...props}
										width={theme.fontSizes['6xl']}
										height={theme.fontSizes['6xl']}
										fontSize={theme.fontSizes['6xl']}
										icon='error_outline'
									/>
								)}
								p={2}
							/>
							<QueryEmptyBody>
								<QueryEmptyTitle />
								<QueryEmptySubtitle>
									{getEmptySubtitle({
										type: 'error',
										label: `Similar ${formatMediaTypeLabel({ type: 'multiple', mediaType })}`
									})}
								</QueryEmptySubtitle>
							</QueryEmptyBody>
							<QueryEmptyActions
								renderActions={(props) => (
									<Button {...props} onClick={refetch}>
										Try Again
									</Button>
								)}
							/>
						</QueryEmptyStack>
					</QueryEmpty>
				) : !(isFetching || isLoading) && mediaItemsDebounced && mediaItemsDebounced.length === 0 ? (
					<QueryEmpty color={color} colorMode={colorMode}>
						<QueryEmptyStack>
							<QueryEmptyBody>
								<QueryEmptyTitle />
								<QueryEmptySubtitle>
									{getEmptySubtitle({
										type: 'empty',
										label: `Similar ${formatMediaTypeLabel({ type: 'multiple', mediaType })}`
									})}
								</QueryEmptySubtitle>
							</QueryEmptyBody>
							<QueryEmptyActions
								renderActions={(props) => (
									<Button {...props} onClick={refetch}>
										Try Again
									</Button>
								)}
							/>
						</QueryEmptyStack>
					</QueryEmpty>
				) : !(isFetching || isLoading) && mediaItemsDebounced && mediaItemsDebounced.length > 0 ? (
					<HorizontalGridScroll>
						{compact(
							mediaItemsDebounced.map((mediaItem) =>
								mediaType === 'movie' ? (
									<MovieVerticalPoster key={mediaItem.id} movie={mediaItem} sx={{ width }} />
								) : mediaType === 'tv' ? (
									<TVShowVerticalPoster key={mediaItem.id} show={mediaItem} sx={{ width }} />
								) : null
							)
						)}
					</HorizontalGridScroll>
				) : (
					<HorizontalGridScroll>
						{range(20).map((_dummy, index) => (
							<DummyVerticalPoster key={index} mediaType={mediaType} hasSubtitle sx={{ width }} />
						))}
					</HorizontalGridScroll>
				)}
			</HorizontalGridBody>
		</HorizontalGrid>
	);
};

export default ViewSimilar;
