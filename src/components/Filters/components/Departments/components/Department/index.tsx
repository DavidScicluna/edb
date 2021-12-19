import { ReactElement } from 'react';

import { Check as CheckIcon } from 'react-feather';

import { useSelector } from '../../../../../../common/hooks';

import Button from '../../../../../Clickable/Button';
import { DepartmentProps } from './types';

const Department = ({ id, name, value, isActive = false, onClick }: DepartmentProps): ReactElement => {
  const color = useSelector((state) => state.user.ui.theme.color);

  return (
    <Button
      color={isActive ? color : 'gray'}
      leftIcon={isActive ? CheckIcon : undefined}
      onClick={() => onClick({ id, name, value })}
      size='sm'
      variant='outlined'>
      {name}
    </Button>
  );
};

export default Department;
