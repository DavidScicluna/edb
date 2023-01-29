import { FC } from 'react';

import { useTheme, InternalLink, Button, Divider } from '@davidscicluna/component-library';

import { useMediaQuery, VStack, Center, Text } from '@chakra-ui/react';

import { sort } from 'fast-sort';
import numbro from 'numbro';
import { compact } from 'lodash';

import dimensions from '../../../../../../components/Posters/common/data/dimensions';
import { useSelector, useUserTheme } from '../../../../../../common/hooks';
import {
	HorizontalGrid,
	HorizontalGridHeader,
	HorizontalGridBody,
	HorizontalGridScroll,
	HorizontalGridFooter,
	MovieVerticalPoster,
	TVShowVerticalPoster,
	PersonVerticalPoster,
	CollectionVerticalPoster
} from '../../../../../../components';
import { useLayoutContext } from '../../../../common/hooks';
import { formatMediaTypeLabel } from '../../../../../../common/utils';

const RecentlyViewed: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const { spacing } = useLayoutContext();

	const recentlyViewed = useSelector((state) =>
		sort([
			...state.users.data.activeUser.data.recentlyViewed.movie,
			...state.users.data.activeUser.data.recentlyViewed.tv,
			...state.users.data.activeUser.data.recentlyViewed.person,
			...state.users.data.activeUser.data.recentlyViewed.collection
		]).desc(({ addedAt }) => addedAt)
	);

	return recentlyViewed.length > 0 ? (
		<VStack width='100%' spacing={0} mt={spacing}>
			<Divider colorMode={colorMode} />

			<Center width='100%' p={spacing}>
				<HorizontalGrid colorMode={colorMode} isFullWidth spacing={2} p={2}>
					<HorizontalGridHeader
						renderTitle={(props) => <Text {...props}>Recently Viewed</Text>}
						renderSubtitle={(props) => (
							<Text {...props}>
								{`This list is showcasing the most recently viewed ${formatMediaTypeLabel({
									type: 'multiple',
									mediaType: 'movie'
								})}, ${formatMediaTypeLabel({
									type: 'multiple',
									mediaType: 'tv'
								})}, ${formatMediaTypeLabel({
									type: 'multiple',
									mediaType: 'person'
								})} & ${formatMediaTypeLabel({ type: 'multiple', mediaType: 'collection' })}`}
							</Text>
						)}
						arrowProps={{ variant: 'icon' }}
						spacing={0}
					/>
					<HorizontalGridBody>
						<HorizontalGridScroll>
							{compact(
								recentlyViewed
									.filter((_mediaItem, index) => index < 20)
									.map(({ mediaType, mediaItem }) =>
										mediaType === 'movie' ? (
											<MovieVerticalPoster key={mediaItem.id} movie={mediaItem} sx={dimensions} />
										) : mediaType === 'tv' ? (
											<TVShowVerticalPoster key={mediaItem.id} show={mediaItem} sx={dimensions} />
										) : mediaType === 'person' ? (
											<PersonVerticalPoster
												key={mediaItem.id}
												person={mediaItem}
												sx={dimensions}
											/>
										) : mediaType === 'collection' ? (
											<CollectionVerticalPoster
												key={mediaItem.id}
												collection={mediaItem}
												sx={dimensions}
											/>
										) : null
									)
							)}
						</HorizontalGridScroll>
					</HorizontalGridBody>
					<HorizontalGridFooter>
						<InternalLink to='/recently-viewed' isFullWidth>
							<Button
								color={color}
								colorMode={colorMode}
								isFullWidth
								size={isSm ? 'xs' : 'sm'}
								variant='text'
							>
								{`View all ${numbro(recentlyViewed.length).format({ average: true })} Recently Viewed`}
							</Button>
						</InternalLink>
					</HorizontalGridFooter>
				</HorizontalGrid>
			</Center>
		</VStack>
	) : null;
};

export default RecentlyViewed;
