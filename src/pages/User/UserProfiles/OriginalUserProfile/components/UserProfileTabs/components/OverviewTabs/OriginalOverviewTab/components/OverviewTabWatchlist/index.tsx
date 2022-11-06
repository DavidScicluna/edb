import { FC } from 'react';

import { useTheme, Button, Icon } from '@davidscicluna/component-library';

import { useMediaQuery, Text } from '@chakra-ui/react';

import { sort } from 'fast-sort';
import numbro from 'numbro';

import { useSelector, useUserTheme } from '../../../../../../../../../../../common/hooks';
import {
	HorizontalGrid,
	HorizontalGridHeader,
	HorizontalGridBody,
	HorizontalGridScroll,
	HorizontalGridFooter,
	QueryEmpty,
	QueryEmptyStack,
	QueryEmptyIcon,
	QueryEmptyBody,
	QueryEmptyTitle,
	QueryEmptySubtitle,
	MovieVerticalPoster,
	TVShowVerticalPoster
} from '../../../../../../../../../../../components';
import { formatMediaTypeLabel } from '../../../../../../../../../../../common/utils';

import { OverviewTabWatchlistProps } from './types';

// TODO: Extract vertical poster widths into method
export const width = ['185px', '205px', '230px'];

const limit = 20;

const OverviewTabWatchlist: FC<OverviewTabWatchlistProps> = ({ onTabChange }) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const {
		label,
		mediaItems: { movie = [], tv = [] }
	} = useSelector((state) => state.users.data.activeUser.data.lists[0]);
	const total = movie.length + tv.length;

	return (
		<HorizontalGrid colorMode={colorMode} isFullWidth spacing={2} p={2}>
			<HorizontalGridHeader
				renderTitle={(props) => <Text {...props}>{label}</Text>}
				// renderSubtitle={(props) => (
				// 	<Text {...props}>
				// 		{`A list containing the most popular ${formatMediaTypeLabel({
				// 			type: total === 1 ? 'single' : 'multiple',
				// 			mediaType: 'movie'
				// 		})} that you have liked`}
				// 	</Text>
				// )}
				arrowProps={{ variant: 'icon' }}
				spacing={0}
			/>

			<HorizontalGridBody>
				{total === 0 ? (
					<QueryEmpty color={color} colorMode={colorMode}>
						<QueryEmptyStack>
							<QueryEmptyIcon
								renderIcon={(props) => (
									<Icon
										{...props}
										width={theme.fontSizes['6xl']}
										height={theme.fontSizes['6xl']}
										fontSize={theme.fontSizes['6xl']}
										icon='bookmark_border'
									/>
								)}
								p={2}
							/>
							<QueryEmptyBody>
								<QueryEmptyTitle />
								<QueryEmptySubtitle>
									{`Unfortunately couldn't find anything in the ${label} list! Please add a ${formatMediaTypeLabel(
										{ type: 'single', mediaType: 'movie' }
									)} or ${formatMediaTypeLabel({
										type: 'single',
										mediaType: 'tv'
									})} to be able to view it in the list.`}
								</QueryEmptySubtitle>
							</QueryEmptyBody>
						</QueryEmptyStack>
					</QueryEmpty>
				) : (
					<HorizontalGridScroll>
						{sort([...movie, ...tv])
							.desc(({ mediaItem }) => mediaItem.popularity)
							.filter((_mediaItem, index) => index <= limit)
							.map(({ mediaType, mediaItem }) =>
								mediaType === 'movie' ? (
									<MovieVerticalPoster key={mediaItem.id} movie={mediaItem} sx={{ width }} />
								) : (
									<TVShowVerticalPoster key={mediaItem.id} show={mediaItem} sx={{ width }} />
								)
							)}
					</HorizontalGridScroll>
				)}
			</HorizontalGridBody>

			{total > 0 && (
				<HorizontalGridFooter>
					<Button
						color={color}
						colorMode={colorMode}
						isFullWidth
						onClick={() => onTabChange({ index: 2 })}
						size={isSm ? 'xs' : 'sm'}
						variant='text'
					>
						{`View all ${numbro(total).format({ average: true })} bookmarks in ${label}`}
					</Button>
				</HorizontalGridFooter>
			)}
		</HorizontalGrid>
	);
};

export default OverviewTabWatchlist;
