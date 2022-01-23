import React, { ReactElement } from 'react';

import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';

import Button from '../../../../../../components/Clickable/Button';
import { SearchTypeProps } from './types';

const SearchType = (props: SearchTypeProps): ReactElement => {
  const { value, label, color, isActive = false, renderLeftIcon, onClick } = props;

  return (
    <Button
      color={isActive ? color : 'gray'}
      renderLeftIcon={({ fontSize }) =>
        renderLeftIcon({
          isActive,
          fontSize
        })
      }
      renderRightIcon={isActive ? ({ fontSize }) => <CheckOutlinedIcon style={{ fontSize }} /> : undefined}
      onClick={() => onClick(value)}
      variant='outlined'
    >
      {label}
    </Button>
  );
};

export default SearchType;
