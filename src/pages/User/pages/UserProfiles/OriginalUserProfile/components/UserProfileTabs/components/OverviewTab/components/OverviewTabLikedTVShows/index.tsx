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
	TVShowVerticalPoster
} from '../../../../../../../../../../../components';
import { formatMediaTypeLabel } from '../../../../../../../../../../../common/utils';

import { OverviewTabLikedTVShowsProps } from './types';

// TODO: Extract vertical poster widths into method
export const width = ['185px', '205px', '230px'];

const limit = 20;

const OverviewTabLikedTVShows: FC<OverviewTabLikedTVShowsProps> = ({ onTabChange }) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const shows = useSelector((state) => state.users.data.activeUser.data.liked.tv || []);
	const total = shows.length;

	return (
		<HorizontalGrid colorMode={colorMode} isDisabled={total === 0} isFullWidth spacing={2} p={2}>
			<HorizontalGridHeader
				renderTitle={(props) => (
					<Text {...props}>{`Liked ${formatMediaTypeLabel({ type: 'multiple', mediaType: 'tv' })}`}</Text>
				)}
				renderSubtitle={(props) => (
					<Text {...props}>
						{`A list containing the most popular ${formatMediaTypeLabel({
							type: total === 1 ? 'single' : 'multiple',
							mediaType: 'tv'
						})} that you have liked`}
					</Text>
				)}
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
										icon='favorite_border'
									/>
								)}
								p={2}
							/>
							<QueryEmptyBody>
								<QueryEmptyTitle />
								<QueryEmptySubtitle>
									{`Unfortunately couldn't find any ${formatMediaTypeLabel({
										type: 'multiple',
										mediaType: 'tv'
									})} in the liked list! Please like a ${formatMediaTypeLabel({
										type: 'single',
										mediaType: 'tv'
									})} to be able to view it in the liked list.`}
								</QueryEmptySubtitle>
							</QueryEmptyBody>
						</QueryEmptyStack>
					</QueryEmpty>
				) : (
					<HorizontalGridScroll>
						{sort(shows)
							.desc(({ mediaItem }) => mediaItem.popularity)
							.filter((_show, index) => index <= limit)
							.map((show) => (
								<TVShowVerticalPoster key={show.mediaItem.id} show={show.mediaItem} sx={{ width }} />
							))}
					</HorizontalGridScroll>
				)}
			</HorizontalGridBody>

			{total > 0 && (
				<HorizontalGridFooter>
					<Button
						color={color}
						colorMode={colorMode}
						isFullWidth
						onClick={() => onTabChange({ index: 1 })}
						size={isSm ? 'xs' : 'sm'}
						variant='text'
					>
						{`View all ${numbro(total).format({ average: true })} liked ${formatMediaTypeLabel({
							type: total === 1 ? 'single' : 'multiple',
							mediaType: 'tv'
						})}`}
					</Button>
				</HorizontalGridFooter>
			)}
		</HorizontalGrid>
	);
};

export default OverviewTabLikedTVShows;
