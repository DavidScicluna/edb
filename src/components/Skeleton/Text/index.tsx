import React, { ReactElement } from 'react';

import Skeleton from '../../Skeleton';
import commonProps from '../common/props';
import utils from '../common/utils/utils';
import { SkeletonProps } from '../types';

const SkeletonText = (props: SkeletonProps): ReactElement => {
  const { children, color = 'gray', ...rest } = props;

  return (
    <Skeleton
      {...rest}
      {...commonProps}
      startColor={utils.handleReturnColors('start', color)}
      endColor={utils.handleReturnColors('end', color)}>
      {children}
    </Skeleton>
  );
};

export default SkeletonText;
