import { ReactElement } from 'react';

import { useColorMode, SlideFade, useTheme } from '@chakra-ui/react';

import { handleConvertStringToNumber } from '../../../common/utils';
import { Theme } from '../../../theme/types';
import Skeleton from '../../Skeleton';
import commonProps from '../common/props';
import { handleReturnColors } from '../common/utils';
import { SkeletonTextProps } from './types';

const SkeletonText = (props: SkeletonTextProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  const { children, color = 'gray', isLoaded = false, offsetY, ...rest } = props;

  return (
    <Skeleton
      {...rest}
      {...commonProps}
      isLoaded={isLoaded}
      type='text'
      startColor={handleReturnColors('start', color, colorMode)}
      endColor={handleReturnColors('end', color, colorMode)}>
      <SlideFade
        in={isLoaded}
        offsetY={offsetY}
        delay={handleConvertStringToNumber(theme.transition.duration['faster'], 'ms') / 250}>
        {children}
      </SlideFade>
    </Skeleton>
  );
};

export default SkeletonText;
