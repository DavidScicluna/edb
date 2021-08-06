import React, { ReactElement } from 'react';

import { Badge as CUIBadge } from '@chakra-ui/react';

import useSelector from '../../../../../../../../../../common/hooks/useSelectorTyped';
import { BadgeProps } from './types';

const Badge = ({ label }: BadgeProps): ReactElement => {
  const color = useSelector((state) => state.user.ui.theme.color);

  return (
    <CUIBadge color={`${color}.400`} background={`${color}.50`} variant='subtle'>
      {label}
    </CUIBadge>
  );
};

export default Badge;
