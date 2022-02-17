import { ReactElement } from 'react';

import { useSelector } from '../../../../../../../../common/hooks';
import Badge from '../../../../../../../../components/Badge';
import { StatusProps } from './types';

const Status = (props: StatusProps): ReactElement => {
  const color = useSelector((state) => state.user.ui.theme.color);

  const { status, fontSize, isLoading = true } = props;

  return (
    <Badge color={color} size={fontSize} isLoading={isLoading} variant='outlined'>
      {status || 'TV Show Status'}
    </Badge>
  );
};

export default Status;
