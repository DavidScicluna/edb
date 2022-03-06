import { ReactElement } from 'react';

import { useBoolean } from '@chakra-ui/react';

import { PosterLikeProps } from './types';

import { MediaType } from '../../../../common/types';
import IconButton from '../../../Clickable/IconButton';
import Like, { handleReturnIcon } from '../../../Clickable/Like';
import Tooltip from '../../../Tooltip';

const PosterLike = <MT extends MediaType>(props: PosterLikeProps<MT>): ReactElement => {
	const { title, mediaType, mediaItem, isLoading = true, size = 'md' } = props;

	const [isHovering, setIsHovering] = useBoolean();

	const isDisabled: boolean = isLoading || !mediaItem;

	return (
		<Like
			renderButton={({ isLiked, onClick }) => (
				<Tooltip
					aria-label={
						isLiked ? `Dislike "${title}" ${mediaType} (tooltip)` : `Like "${title}" ${mediaType} (tooltip)`
					}
					label={isLiked ? `Dislike "${title}"` : `Like "${title}"`}
					placement='top'
					isOpen={!isDisabled && isHovering}
					isDisabled={isDisabled}
					gutter={2}
				>
					<IconButton
						aria-label={isLiked ? `Dislike "${title}" ${mediaType}` : `Like "${title}" ${mediaType}`}
						color={isLiked ? 'red' : 'gray'}
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
						{handleReturnIcon(isLiked)}
					</IconButton>
				</Tooltip>
			)}
			mediaType={mediaType}
			mediaItem={mediaItem}
		/>
	);
};

export default PosterLike;
