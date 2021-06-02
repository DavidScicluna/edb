import React, { ReactElement } from 'react';

import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@material-ui/icons/BookmarkOutlined';

import { Type } from '../../common/types/types';
import IconButton from '../Inputs/IconButton';
import Tooltip from '../Tooltip';

interface ListProps {
  isListed: boolean;
  isDisabled: boolean;
  title: string | null;
  type: Type;
  list?: string; // TODO: Change type to list once list logic is implemented
}

const List = ({ isListed = false, isDisabled = false, title = 'N/A', type }: ListProps): ReactElement => {
  const titleText: string = title ? (title.length < 25 ? title : '') : '';

  return (
    <Tooltip
      aria-label={
        isListed ? `Remove ${titleText} ${type} from {LIST NAME} tooltip` : `Add ${titleText} ${type} to a list tooltip`
      }
      label={isListed ? `Remove ${titleText} ${type} from {LIST NAME}?` : `Add ${titleText} ${type} to a list?`}
      placement='top'
      isDisabled={isDisabled}
      gutter={6}>
      <IconButton
        aria-label={isListed ? `Remove ${titleText} ${type} from {LIST NAME}` : `Add ${titleText} ${type} to a list`}
        color={isListed ? 'blue' : 'gray'}
        isDisabled={isDisabled}
        icon={isListed ? BookmarkOutlinedIcon : BookmarkBorderOutlinedIcon}
        size='xs'
        variant='icon'
      />
    </Tooltip>
  );
};

export default List;
