import { ReactElement } from 'react';

import { Tooltip, IconButton, IconButtonIcon } from '@davidscicluna/component-library';

import { useBoolean } from '@chakra-ui/react';

import { useSelector, useUserTheme } from '../../../../common/hooks';
import Bookmark from '../../../Clickable/Bookmark';
import { MediaType } from '../../../../common/types';
import { formatMediaTypeLabel } from '../../../../common/utils';

import { PosterBookmarkProps } from './types';

const PosterBookmark = <MT extends MediaType>(props: PosterBookmarkProps<MT>): ReactElement => {
	const { color, colorMode } = useUserTheme();

	const { mediaItem: bookmarkModalMediaItem, isOpen } = useSelector((state) => state.modals.ui.bookmarkModal);

	const { title, mediaType, mediaItem, size = 'md' } = props;

	const [isFocused, setIsFocused] = useBoolean();
	const [isHovering, setIsHovering] = useBoolean();

	return (
		<Bookmark<MT>
			renderAction={({ iconType, iconCategory, isDisabled, isBookmarked, isBookmarkedMultiple, onClick }) => (
				<Tooltip
					colorMode={colorMode}
					aria-label={
						isBookmarked
							? `Remove "${title}" ${formatMediaTypeLabel({ type: 'single', mediaType })} from ${
									isBookmarkedMultiple ? 'lists' : 'list'
							  } (tooltip)`
							: `Add "${title}" ${formatMediaTypeLabel({
									type: 'single',
									mediaType
							  })} to a list (tooltip)`
					}
					label={
						isBookmarked
							? `Remove ${formatMediaTypeLabel({ type: 'single', mediaType })} from ${
									isBookmarkedMultiple ? 'lists' : 'list'
							  }`
							: `Add ${formatMediaTypeLabel({ type: 'single', mediaType })} to a list`
					}
					placement='top'
					isOpen={!(isDisabled || !mediaItem) && isHovering}
					isDisabled={isDisabled || !mediaItem}
					gutter={2}
				>
					<IconButton
						aria-label={
							isBookmarked
								? `Remove "${title}" ${formatMediaTypeLabel({ type: 'single', mediaType })} from ${
										isBookmarkedMultiple ? 'lists' : 'list'
								  }`
								: `Add "${title}" ${formatMediaTypeLabel({ type: 'single', mediaType })} to a list`
						}
						color={
							(isOpen && bookmarkModalMediaItem?.id === mediaItem.id) ||
							isBookmarked ||
							isBookmarkedMultiple
								? color
								: 'gray'
						}
						colorMode={colorMode}
						isDisabled={isDisabled}
						onClick={(event) => {
							event.preventDefault();
							event.stopPropagation();

							onClick();
						}}
						onFocus={() => setIsFocused.on()}
						onBlur={() => setIsFocused.off()}
						onMouseEnter={() => setIsHovering.on()}
						onMouseLeave={() => setIsHovering.off()}
						size={size}
						variant='icon'
					>
						<IconButtonIcon icon={iconType} category={iconCategory} />
					</IconButton>
				</Tooltip>
			)}
			title={title}
			mediaType={mediaType}
			mediaItem={mediaItem}
			isFocused={isFocused}
			isHovering={isHovering}
		/>
	);
};

export default PosterBookmark;
