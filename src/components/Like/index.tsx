import React, { ReactElement, useState } from 'react';

import {
  FavoriteBorderOutlined as FavoriteBorderOutlinedIcon,
  FavoriteOutlined as FavoriteOutlinedIcon
} from '@material-ui/icons';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import useSelector from '../../common/hooks/useSelectorTyped';
import { setLiked } from '../../store/slices/User';
import IconButton from '../Clickable/IconButton';
import Tooltip from '../Tooltip';
import { LikeProps } from './types';

const Like = ({ isDisabled = false, mediaItem, size = 'xs' }: LikeProps): ReactElement => {
  const dispatch = useDispatch();
  const liked = useSelector((state) => state.user.data.liked);

  const [isHovering, setIsHovering] = useState<boolean>(false);

  const isLiked: boolean = liked.some((like) => like.id === mediaItem.id && like.mediaType === mediaItem.mediaType);

  return (
    <Tooltip
      aria-label={
        isLiked
          ? `Dislike "${mediaItem.title}" ${mediaItem.mediaType} (tooltip)`
          : `Like "${mediaItem.title}" ${mediaItem.mediaType} (tooltip)`
      }
      label={isLiked ? `Dislike "${mediaItem.title}"` : `Like "${mediaItem.title}"`}
      placement='top'
      isOpen={isHovering}
      isDisabled={isDisabled}
      gutter={0}>
      <IconButton
        aria-label={
          isLiked
            ? `Dislike "${mediaItem.title}" ${mediaItem.mediaType} (tooltip)`
            : `Like "${mediaItem.title}" ${mediaItem.mediaType} (tooltip)`
        }
        color={isLiked ? 'red' : 'gray'}
        isDisabled={isDisabled}
        icon={isLiked ? FavoriteOutlinedIcon : FavoriteBorderOutlinedIcon}
        onClick={
          isLiked
            ? () => dispatch(setLiked(liked.filter((like) => like.id !== mediaItem.id)))
            : () =>
                dispatch(
                  setLiked([
                    ...liked,
                    { id: mediaItem.id, mediaType: mediaItem.mediaType, dateAdded: moment(new Date()).toISOString() }
                  ])
                )
        }
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        size={size}
        variant='icon'
      />
    </Tooltip>
  );
};

export default Like;
