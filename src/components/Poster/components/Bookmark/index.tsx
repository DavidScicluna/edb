import { ReactElement } from 'react';

import { IconButton, Icon } from '@davidscicluna/component-library';

import { useBoolean } from '@chakra-ui/react';

import { useSelector } from '../../../../common/hooks';
import { MediaType } from '../../../../common/types';
import { defaultUser, getUser } from '../../../../store/slices/Users';
import Bookmark from '../../../Clickable/Bookmark';
import Tooltip from '../../../Tooltip';

import { PosterBookmarkProps } from './types';

const PosterBookmark = <MT extends MediaType>(props: PosterBookmarkProps<MT>): ReactElement => {
	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);
	const listsModal = useSelector((state) => state.modals.ui.listsModal);

	const { title, mediaType, mediaItem, isLoading = true, size = 'md' } = props;

	const [isHovering, setIsHovering] = useBoolean();

	return (
		<Bookmark
			renderAction={({ lists, isDisabled: isDisabledProp, isBookmarked, onClick }) => {
				const isDisabled: boolean = isDisabledProp || isLoading || !mediaItem;

				return (
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
							color={
								(listsModal.open && listsModal.mediaItem?.id === mediaItem?.id) || isBookmarked
									? color
									: 'gray'
							}
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
							<Icon
								icon={
									isBookmarked
										? isHovering
											? 'bookmark_remove'
											: 'bookmark_added'
										: isHovering
										? 'bookmark_add'
										: 'bookmark_border'
								}
								category='outlined'
							/>
						</IconButton>
					</Tooltip>
				);
			}}
			title={title}
			mediaType={mediaType}
			mediaItem={mediaItem}
		/>
	);
};

export default PosterBookmark;
