import { ReactElement } from 'react';

import { useTheme, IconButton, IconButtonIcon } from '@davidscicluna/component-library';

import { useMediaQuery, HStack } from '@chakra-ui/react';

import Review from '../ViewReviewsReview';
import { useSelector, useUserTheme } from '../../../../../../../common/hooks';
import { ViewReviewsMediaType } from '../../types';
import EditMyReview from '../ViewReviewsCreateEditMyReview';
import DeleteMyReview from '../ViewReviewsDeleteMyReview';

import { ViewReviewsMyReviewProps } from './types';

/*
 * TODO: Maybe consolidate reviews under 1 card if there are multiple reviews
 * Meaning have only 1 card header with avatar name and username and place reviews
 * in a card with review body and rating
 */
const ViewReviewsMyReview = <MT extends ViewReviewsMediaType>(props: ViewReviewsMyReviewProps<MT>): ReactElement => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const { mediaType, mediaItem, review } = props;
	const { rating, createdAt, updatedAt, content = '' } = review;

	const {
		info: { name, avatar_path },
		credentials: { username }
	} = useSelector((state) => state.users.data.activeUser.data);

	return (
		<Review
			renderFooterActions={() => (
				<HStack spacing={0}>
					<EditMyReview<MT>
						mediaType={mediaType}
						mediaItem={mediaItem}
						renderButton={({ icon, category, ...rest }) => (
							<IconButton
								{...rest}
								color='gray'
								colorMode={colorMode}
								isFullWidth
								size={isSm ? 'xs' : 'sm'}
								variant='icon'
							>
								<IconButtonIcon icon={icon} category={category} />
							</IconButton>
						)}
						review={review}
					/>
					<DeleteMyReview<MT>
						mediaType={mediaType}
						mediaItem={mediaItem}
						renderButton={({ icon, category, ...rest }) => (
							<IconButton
								{...rest}
								color='gray'
								colorMode={colorMode}
								isFullWidth
								size={isSm ? 'xs' : 'sm'}
								variant='icon'
							>
								<IconButtonIcon icon={icon} category={category} />
							</IconButton>
						)}
						review={review}
					/>
				</HStack>
			)}
			name={name}
			username={username}
			avatar_path={avatar_path}
			rating={rating}
			created_at={createdAt}
			updated_at={updatedAt}
			content={content}
		/>
	);
};

export default ViewReviewsMyReview;
