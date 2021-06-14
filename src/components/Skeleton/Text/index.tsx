import React, { ReactElement } from 'react';

import { SkeletonText as CUISkeletonText } from '@chakra-ui/react';

import commonProps from '../common/props';
import utils from '../common/utils/utils';
import { SkeletonTextProps } from './types';

const SkeletonText = (props: SkeletonTextProps): ReactElement => {
  const { children, color = 'gray', noOfLines = 1, ...rest } = props;

  return (
    <CUISkeletonText
      {...rest}
      {...commonProps}
      noOfLines={noOfLines}
      startColor={utils.handleReturnColors('start', color)}
      endColor={utils.handleReturnColors('end', color)}>
      {children}
    </CUISkeletonText>
  );
};

export default SkeletonText;
