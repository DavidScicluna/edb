import React, { ReactElement } from 'react';

import { useTheme, Theme, useColorMode, Tooltip as CUITooltip } from '@chakra-ui/react';

import { handleIsTouchDevice, handleReturnNumberFromString } from '../../common/utils';
import { TooltipProps } from './types';

const Tooltip = (props: TooltipProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  const { children, colorMode: colorModeProp, closeDelay, openDelay, shouldWrapChildren = false, ...rest } = props;

  const mode = colorModeProp || colorMode;

  return !handleIsTouchDevice() ? (
    <CUITooltip
      {...rest}
      arrowSize={8}
      color={mode === 'light' ? 'gray.50' : 'gray.900'}
      backgroundColor={mode === 'light' ? 'gray.700' : 'gray.200'}
      closeDelay={closeDelay ? closeDelay : handleReturnNumberFromString(theme.transition.duration.slow, 'ms')}
      openDelay={openDelay ? openDelay : handleReturnNumberFromString(theme.transition.duration.normal, 'ms')}
      hasArrow
      sx={{
        '& .chakra-tooltip__arrow': {
          backgroundColor: `${mode === 'light' ? theme.colors.gray[700] : theme.colors.gray[200]} !important`
        }
      }}>
      {shouldWrapChildren ? <span style={{ width: '100%' }}>{children}</span> : children}
    </CUITooltip>
  ) : (
    children
  );
};

export default Tooltip;
