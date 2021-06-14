import React, { ReactElement } from 'react';

import { SkeletonCircle as CUISkeletonCircle, SkeletonProps } from '@chakra-ui/react';

import commonProps from '../common/props';

const SkeletonCircle = (props: SkeletonProps): ReactElement => {
  const { children, ...rest } = props;

  return (
    <CUISkeletonCircle {...rest} {...commonProps}>
      {children}
    </CUISkeletonCircle>
  );
};

export default SkeletonCircle;
