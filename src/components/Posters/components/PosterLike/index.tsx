import { ReactElement } from 'react';

import { Tooltip, IconButton, IconButtonIcon } from '@davidscicluna/component-library';

import { useBoolean } from '@chakra-ui/react';

import { MediaType } from '../../../../common/types';
import Like from '../../../Clickable/Like';
import { useUserTheme } from '../../../../common/hooks';

import { PosterLikeProps } from './types';

// TODO: Maybe add Heart animation like insta on like

const PosterLike = <MT extends MediaType>(props: PosterLikeProps<MT>): ReactElement => {
	const { colorMode } = useUserTheme();

	const { title, mediaType, mediaItem, size = 'md' } = props;

	const [isHovering, setIsHovering] = useBoolean();

	return (
		<Like<MT>
			renderAction={({ iconType, iconCategory, isDisabled, isLiked, onClick }) => (
				<Tooltip
					colorMode={colorMode}
					aria-label={
						isLiked ? `Dislike "${title}" ${mediaType} (tooltip)` : `Like "${title}" ${mediaType} (tooltip)`
					}
					label={
						isLiked
							? title.length <= 15
								? `Dislike "${title}"`
								: 'Dislike'
							: title.length <= 15
							? `Like "${title}"`
							: 'Like'
					}
					placement='top'
					isOpen={!(isDisabled || !mediaItem) && isHovering}
					isDisabled={isDisabled || !mediaItem}
					gutter={2}
				>
					<IconButton
						aria-label={isLiked ? `Dislike "${title}" ${mediaType}` : `Like "${title}" ${mediaType}`}
						color={isLiked ? 'red' : 'gray'}
						isDisabled={isDisabled || !mediaItem}
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
						<IconButtonIcon icon={iconType} category={iconCategory} />
					</IconButton>
				</Tooltip>
			)}
			mediaType={mediaType}
			mediaItem={mediaItem}
		/>
	);
};

export default PosterLike;
