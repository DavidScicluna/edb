import { ReactElement } from 'react';

import { useColorMode, SkeletonCircle as CUISkeletonCircle, SkeletonProps } from '@chakra-ui/react';

import commonProps from '../common/props';
import { handleReturnColors } from '../common/utils';

const SkeletonCircle = (props: SkeletonProps): ReactElement => {
  const { colorMode } = useColorMode();

  const { children, ...rest } = props;

  return (
    <CUISkeletonCircle
      {...rest}
      {...commonProps}
      startColor={handleReturnColors('start', 'gray', colorMode)}
      endColor={handleReturnColors('end', 'gray', colorMode)}
    >
      {children}
    </CUISkeletonCircle>
  );
};

export default SkeletonCircle;
