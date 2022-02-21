import { ReactElement } from 'react';

import { useBoolean } from '@chakra-ui/react';

import {
	BookmarkBorderOutlined as BookmarkBorderOutlinedIcon,
	BookmarkOutlined as BookmarkOutlinedIcon
} from '@material-ui/icons';

import { PosterBookmarkProps } from './types';

import { useSelector } from '../../../../common/hooks';
import { MediaType } from '../../../../common/types';
import Bookmark from '../../../Clickable/Bookmark';
import IconButton from '../../../Clickable/IconButton';
import Tooltip from '../../../Tooltip';

const PosterBookmark = <MT extends MediaType>(props: PosterBookmarkProps<MT>): ReactElement => {
	const [isHovering, setIsHovering] = useBoolean();

	const color = useSelector((state) => state.user.ui.theme.color);

	const { title, mediaType, mediaItem, isLoading = true, size } = props;

	const isDisabled: boolean = isLoading || !mediaItem;

	return (
		<Bookmark
			renderButton={({ lists, isBookmarked, onClick }) => (
				<Tooltip
					aria-label={
						isBookmarked
							? `Remove "${title}" ${mediaType} from ${
									lists && (lists?.length || 0) === 1
										? `${lists[0].label ? `"${lists[0].label}" list` : ''}`
										: 'lists'
							  } (tooltip)`
							: `Add "${title}" ${mediaType} to a list (tooltip)`
					}
					label={
						isBookmarked
							? `Remove "${title}" from ${
									lists && (lists?.length || 0) === 1
										? `${lists[0].label ? `"${lists[0].label}" list` : ''}`
										: 'lists'
							  }`
							: `Add "${title}" to a list`
					}
					placement='top'
					isOpen={!isDisabled && isHovering}
					isDisabled={isDisabled}
					gutter={2}
				>
					<IconButton
						aria-label={
							isBookmarked
								? `Remove "${title}" ${mediaType} from ${
										lists && (lists?.length || 0) === 1
											? `${lists[0].label ? `"${lists[0].label}" list` : ''}`
											: 'lists'
								  } (tooltip)`
								: `Add "${title}" ${mediaType} to a list (tooltip)`
						}
						color={isBookmarked ? color : 'gray'}
						isDisabled={isDisabled}
						onClick={(event) => {
							event.preventDefault();
							event.stopPropagation();

							onClick();
						}}
						onMouseEnter={() => setIsHovering.on()}
						onMouseLeave={() => setIsHovering.off()}
						size={size}
						variant='icon'
					>
						{isBookmarked ? <BookmarkOutlinedIcon /> : <BookmarkBorderOutlinedIcon />}
					</IconButton>
				</Tooltip>
			)}
			title={title}
			mediaType={mediaType}
			mediaItem={mediaItem}
		/>
	);
};

export default PosterBookmark;