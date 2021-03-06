import React, { ReactElement } from 'react';

import { useTheme, Theme, useColorMode, Tooltip as CUITooltip } from '@chakra-ui/react';

import utils from '../../common/utils/utils';
import { TooltipProps } from './types';

const Tooltip = (props: TooltipProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  const { children, width, closeDelay, openDelay, gutter = 12, span = false, ...rest } = props;

  return !utils.handleIsTouchDevice() ? (
    <CUITooltip
      {...rest}
      arrowSize={8}
      color={colorMode === 'light' ? 'gray.50' : 'gray.900'}
      backgroundColor={colorMode === 'light' ? 'gray.700' : 'gray.200'}
      closeDelay={closeDelay ? closeDelay : utils.handleReturnNumberFromString(theme.transition.duration.normal, 'ms')}
      openDelay={openDelay ? openDelay : utils.handleReturnNumberFromString(theme.transition.duration.fast, 'ms')}
      hasArrow
      gutter={gutter}
      sx={{
        '& .chakra-tooltip__arrow': {
          backgroundColor: `${colorMode === 'light' ? theme.colors.gray[700] : theme.colors.gray[200]} !important`
        }
      }}>
      {span ? <span style={{ width: width || 'auto' }}>{children}</span> : children}
    </CUITooltip>
  ) : (
    children
  );
};

export default Tooltip;
