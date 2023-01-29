import { ReactElement } from 'react';

import { IconButtonMouseEvent, Tooltip, IconButton, IconButtonIcon } from '@davidscicluna/component-library';

import { useBoolean } from '@chakra-ui/react';

import { MediaType } from '../../../../common/types';
import Like from '../../../Clickable/Like';
import { useUserTheme } from '../../../../common/hooks';
import { formatMediaTypeLabel } from '../../../../common/utils';

import { PosterLikeProps } from './types';

const PosterLike = <MT extends MediaType>(props: PosterLikeProps<MT>): ReactElement => {
	const { colorMode } = useUserTheme();

	const { title, mediaType, mediaItem, size = 'md' } = props;

	const [isHovering, setIsHovering] = useBoolean();

	return (
		<Like<MT>
			renderAction={({ iconType, iconCategory, isDisabled, isLiked, onClick, sx }) => (
				<Tooltip
					colorMode={colorMode}
					aria-label={
						isLiked
							? `Dislike "${title}" ${formatMediaTypeLabel({ type: 'single', mediaType })} (tooltip)`
							: `Like "${title}" ${formatMediaTypeLabel({ type: 'single', mediaType })} (tooltip)`
					}
					label={
						isLiked
							? `Dislike ${formatMediaTypeLabel({ type: 'single', mediaType })}`
							: `Like ${formatMediaTypeLabel({ type: 'single', mediaType })}`
					}
					placement='top'
					isOpen={!(isDisabled || !mediaItem) && isHovering}
					isDisabled={isDisabled || !mediaItem}
					gutter={2}
				>
					<IconButton
						aria-label={
							isLiked
								? `Dislike "${title}" ${formatMediaTypeLabel({ type: 'single', mediaType })}`
								: `Like "${title}" ${formatMediaTypeLabel({ type: 'single', mediaType })}`
						}
						color={isLiked ? 'red' : 'gray'}
						colorMode={colorMode}
						isDisabled={isDisabled || !mediaItem}
						onClick={(event: IconButtonMouseEvent) => {
							event.preventDefault();
							event.stopPropagation();

							onClick();
						}}
						onMouseEnter={() => setIsHovering.on()}
						onMouseLeave={() => setIsHovering.off()}
						size={size}
						variant='icon'
						sx={{ ...sx }}
					>
						<IconButtonIcon icon={iconType} category={iconCategory} />
					</IconButton>
				</Tooltip>
			)}
			title={title}
			mediaType={mediaType}
			mediaItem={mediaItem}
		/>
	);
};

export default PosterLike;
