import React, { ReactElement } from 'react';

import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import { useDispatch } from 'react-redux';

import useSelector from '../../common/hooks/useSelectorTyped';
import { setLiked } from '../../store/slices/User';
import IconButton from '../Inputs/IconButton';
import Tooltip from '../Tooltip';
import { LikeProps } from './types';

const Like = ({ isDisabled = false, mediaItem, size = 'xs' }: LikeProps): ReactElement => {
  const dispatch = useDispatch();
  const liked = useSelector((state) => state.user.data.liked);

  const isLiked: boolean = liked.some((like) => like.id === mediaItem.id && like.mediaType === mediaItem.mediaType);
  const titleText: string = mediaItem.title ? (mediaItem.title.length < 25 ? mediaItem.title : '') : '';

  return (
    <Tooltip
      aria-label={
        isLiked
          ? `Dislike "${titleText}" ${mediaItem.mediaType} tooltip`
          : `Like "${titleText}" ${mediaItem.mediaType} tooltip`
      }
      label={isLiked ? `Dislike "${titleText}" ${mediaItem.mediaType}?` : `Like "${titleText}" ${mediaItem.mediaType}?`}
      placement='top'
      isDisabled={isDisabled}
      gutter={0}>
      <IconButton
        aria-label={
          isLiked ? `Dislike "${titleText}" ${mediaItem.mediaType}` : `Like "${titleText}" ${mediaItem.mediaType}`
        }
        color={isLiked ? 'red' : 'gray'}
        isDisabled={isDisabled}
        icon={isLiked ? FavoriteOutlinedIcon : FavoriteBorderOutlinedIcon}
        onClick={
          isLiked
            ? () => dispatch(setLiked(liked.filter((like) => like.id !== mediaItem.id)))
            : () => dispatch(setLiked([...liked, { id: mediaItem.id, mediaType: mediaItem.mediaType }]))
        }
        size={size}
        variant='icon'
      />
    </Tooltip>
  );
};

export default Like;
