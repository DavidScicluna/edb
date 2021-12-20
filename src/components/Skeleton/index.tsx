import { ReactElement } from 'react';

import { useTheme, useColorMode, Skeleton as CUISkeleton } from '@chakra-ui/react';

import { handleConvertStringToNumber } from '../../common/utils';
import { Theme } from '../../theme/types';
import commonProps from './common/props';
import { handleReturnColors } from './common/utils';
import { SkeletonProps } from './types';

const Skeleton = (props: SkeletonProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  const { children, color = 'gray', isLoaded = false, type = 'default', ...rest } = props;

  return (
    <CUISkeleton
      {...rest}
      {...commonProps}
      isLoaded={isLoaded}
      fadeDuration={
        type === 'default' && !isLoaded
          ? handleConvertStringToNumber(theme.transition.duration['normal'], 'ms') / 250
          : 0
      }
      startColor={handleReturnColors('start', color, colorMode)}
      endColor={handleReturnColors('end', color, colorMode)}
    >
      {children}
    </CUISkeleton>
  );
};

export default Skeleton;
