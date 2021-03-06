import React, { ReactElement } from 'react';

import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';

import useSelector from '../../../../../../common/hooks/useSelectorTyped';
import utils from '../../../../../../common/utils/utils';
import Button from '../../../../../Clickable/Button';
import { DepartmentProps } from './types';

const Department = ({ id, name, value, isActive = false, onClick }: DepartmentProps): ReactElement => {
  const color = useSelector((state) => state.user.ui.theme.color);

  return (
    <Button
      color={isActive ? utils.handleReturnColor(color) : 'gray'}
      leftIcon={isActive ? CheckOutlinedIcon : undefined}
      onClick={() => onClick({ id, name, value })}
      size='xs'
      variant='outlined'>
      {name}
    </Button>
  );
};

export default Department;
