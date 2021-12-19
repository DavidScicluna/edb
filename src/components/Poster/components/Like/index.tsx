import { ReactElement } from 'react';

import { useBoolean } from '@chakra-ui/react';
import { Heart as HeartIcon } from 'react-feather';

import { MediaType } from '../../../../common/types';
import IconButton from '../../../Clickable/IconButton';
import Like from '../../../Clickable/Like';
import Tooltip from '../../../Tooltip';
import { PosterLikeProps } from './types';

const PosterLike = <MT extends MediaType>(props: PosterLikeProps<MT>): ReactElement => {
  const [isHovering, setIsHovering] = useBoolean();

  const { title, mediaType, mediaItem, isLoading = true, size } = props;

  return (
    <Like
      renderButton={({ isLiked, onClick }) => (
        <Tooltip
          aria-label={isLiked ? `Dislike "${title}" ${mediaType} (tooltip)` : `Like "${title}" ${mediaType} (tooltip)`}
          label={isLiked ? `Dislike "${title}"` : `Like "${title}"`}
          placement='top'
          isOpen={isHovering}
          isDisabled={isLoading || !mediaItem}
          gutter={8}>
          <IconButton
            aria-label={isLiked ? `Dislike "${title}" ${mediaType}` : `Like "${title}" ${mediaType}`}
            color={isLiked ? 'red' : 'gray'}
            isDisabled={isLoading || !mediaItem}
            // icon={isLiked ? FavoriteOutlinedIcon : FavoriteBorderOutlinedIcon}
            icon={HeartIcon}
            onClick={() => onClick()}
            onMouseEnter={() => setIsHovering.on()}
            onMouseLeave={() => setIsHovering.off()}
            size={size}
            variant='icon'
          />
        </Tooltip>
      )}
      mediaType={mediaType}
      mediaItem={mediaItem}
    />
  );
};

export default PosterLike;
