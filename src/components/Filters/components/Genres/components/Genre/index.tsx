import { ReactElement } from 'react';

import { Check as CheckIcon } from 'react-feather';

import { useSelector } from '../../../../../../common/hooks';

import Button from '../../../../../Clickable/Button';
import { GenreProps } from './types';

const Genre = ({ id, name, isActive = false, onClick }: GenreProps): ReactElement => {
  const color = useSelector((state) => state.user.ui.theme.color);

  return (
    <Button
      color={isActive ? color : 'gray'}
      leftIcon={isActive ? CheckIcon : undefined}
      onClick={() => onClick({ id, name })}
      size='sm'
      variant='outlined'>
      {name}
    </Button>
  );
};

export default Genre;
