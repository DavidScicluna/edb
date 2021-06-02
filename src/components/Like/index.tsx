import React, { ReactElement } from 'react';

import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';

import { Type } from '../../common/types/types';
import IconButton from '../Inputs/IconButton';
import Tooltip from '../Tooltip';

interface LikeProps {
  isLiked: boolean;
  isDisabled: boolean;
  title: string | null;
  type: Type;
}

const Like = ({ isLiked = false, isDisabled = false, title = 'N/A', type }: LikeProps): ReactElement => {
  const titleText: string = title ? (title.length < 25 ? title : '') : '';

  return (
    <Tooltip
      aria-label={isLiked ? `Dislike ${titleText} ${type} tooltip` : `Like ${titleText} ${type} tooltip`}
      label={isLiked ? `Dislike ${titleText} ${type}?` : `Like ${titleText} ${type}?`}
      placement='top'
      isDisabled={isDisabled}
      gutter={6}>
      <IconButton
        aria-label={isLiked ? `Dislike ${titleText} ${type}` : `Like ${titleText} ${type}`}
        color={isLiked ? 'red' : 'gray'}
        isDisabled={isDisabled}
        icon={isLiked ? FavoriteOutlinedIcon : FavoriteBorderOutlinedIcon}
        size='xs'
        variant='icon'
      />
    </Tooltip>
  );
};

export default Like;
