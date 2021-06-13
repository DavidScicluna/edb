import React, { ReactElement } from 'react';

import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';

import IconButton from '../Inputs/IconButton';
import Tooltip from '../Tooltip';
import { LikeProps } from './types';

const Like = ({
  isLiked = false,
  isDisabled = false,
  title = 'N/A',
  mediaType,
  size = 'xs'
}: LikeProps): ReactElement => {
  const titleText: string = title ? (title.length < 25 ? title : '') : '';

  return (
    <Tooltip
      aria-label={isLiked ? `Dislike ${titleText} ${mediaType} tooltip` : `Like ${titleText} ${mediaType} tooltip`}
      label={isLiked ? `Dislike ${titleText} ${mediaType}?` : `Like ${titleText} ${mediaType}?`}
      placement='top'
      isDisabled={isDisabled}
      gutter={0}>
      <IconButton
        aria-label={isLiked ? `Dislike ${titleText} ${mediaType}` : `Like ${titleText} ${mediaType}`}
        color={isLiked ? 'red' : 'gray'}
        isDisabled={isDisabled}
        icon={isLiked ? FavoriteOutlinedIcon : FavoriteBorderOutlinedIcon}
        size={size}
        variant='icon'
      />
    </Tooltip>
  );
};

export default Like;
