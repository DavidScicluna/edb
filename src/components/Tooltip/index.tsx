import { ReactElement, forwardRef } from 'react';

import { ColorMode, useTheme, useColorMode, Tooltip as CUITooltip } from '@chakra-ui/react';


import { TooltipRef, TooltipProps } from './types';

import { handleIsTouchDevice, handleConvertStringToNumber } from '../../common/utils';
import { Theme } from '../../theme/types';

const Tooltip = forwardRef<TooltipRef, TooltipProps>(function Tooltip(props, ref): ReactElement {
  const theme = useTheme<Theme>();
  const { colorMode: colorModeHook } = useColorMode();

  const {
    children,
    colorMode: colorModeProp,
    closeDelay = handleConvertStringToNumber(theme.transition.duration.slow, 'ms') || 500,
    openDelay = handleConvertStringToNumber(theme.transition.duration.normal, 'ms') || 250,
    shouldWrapChildren = false,
    ...rest
  } = props;

  const colorMode: ColorMode = colorModeProp || colorModeHook;

  return !handleIsTouchDevice() ? (
    <CUITooltip
      {...rest}
      ref={ref}
      arrowSize={8}
      color={colorMode === 'light' ? 'gray.50' : 'gray.900'}
      backgroundColor={colorMode === 'light' ? 'gray.700' : 'gray.200'}
      closeDelay={closeDelay}
      openDelay={openDelay}
      hasArrow
      sx={{
        'color': `gray.${colorMode === 'light' ? 50 : 900}`,

        'fontSize': 'sm',
        'fontWeight': 'normal',

        'boxShadow': 'base',
        'borderRadius': 'sm',
        'background': `gray.${colorMode === 'light' ? 700 : 200}`,
        'backgroundColor': `gray.${colorMode === 'light' ? 700 : 200}`,

        'px': 1,
        'py': 0.5,

        '& .chakra-tooltip__arrow': {
          boxShadow: `${theme.shadows.base} !important`,
          background: `${colorMode === 'light' ? theme.colors.gray[700] : theme.colors.gray[200]} !important`,
          backgroundColor: `${colorMode === 'light' ? theme.colors.gray[700] : theme.colors.gray[200]} !important`
        }
      }}
    >
      {shouldWrapChildren ? <span style={{ width: '100%' }}>{children}</span> : children}
    </CUITooltip>
  ) : (
    children
  );
});

export default Tooltip;
