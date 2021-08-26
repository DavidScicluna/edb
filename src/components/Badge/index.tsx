import React, { ReactElement } from 'react';

import { useTheme, useColorMode, Badge as CUIBadge } from '@chakra-ui/react';

import { Theme } from '../../theme/types';
import { BadgeProps } from './types';

const Badge = (props: BadgeProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  const { label, color = 'gray', size = 'sm', ...rest } = props;

  const handleReturnColor = (): string => {
    switch (color) {
      case 'gray':
        return `gray.${colorMode === 'light' ? '900' : '50'}`;
      default:
        return `${color}.600`;
    }
  };

  const handleReturnBackground = (): string => {
    switch (color) {
      case 'gray':
        return `gray.${colorMode === 'light' ? '200' : '700'}`;
      default:
        return `${color}.50`;
    }
  };

  return (
    <CUIBadge
      {...rest}
      color={handleReturnColor()}
      background={handleReturnBackground()}
      variant='subtle'
      fontSize={size === 'xs' ? '10px' : size === 'sm' ? 'xs' : size === 'md' ? 'sm' : 'lg'}
      fontWeight='bold'
      lineHeight='none'
      px={size === 'xs' || size === 'sm' ? 0.5 : size === 'md' ? 0.75 : 1}
      py={size === 'xs' || size === 'sm' ? 0.25 : size === 'md' ? 0.5 : 0.5}
      sx={{ transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}` }}>
      {label}
    </CUIBadge>
  );
};

export default Badge;
