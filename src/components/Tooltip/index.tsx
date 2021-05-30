import React, { ReactElement } from 'react';

import {
  useTheme,
  Theme,
  useColorMode,
  Tooltip as CUITooltip,
  TooltipProps as CUITooltipProps
} from '@chakra-ui/react';

import utils from '../../common/utils/utils';

type Delay = number | null;

type TooltipProps = { closeDelay?: Delay; openDelay?: Delay } & Omit<
  CUITooltipProps,
  'arrowShadowColor' | 'closeDelay' | 'colorScheme' | 'hasArrow' | 'openDelay' | 'size' | 'variant'
>;

const Tooltip = (props: TooltipProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  const { children, closeDelay, openDelay, gutter = 12, ...rest } = props;

  return (
    <CUITooltip
      {...rest}
      color={colorMode === 'light' ? 'gray.50' : 'gray.900'}
      backgroundColor={colorMode === 'light' ? 'gray.700' : 'gray.200'}
      arrowShadowColor={colorMode === 'light' ? 'gray.700' : 'gray.200'}
      closeDelay={closeDelay ? closeDelay : utils.handleReturnNumberFromString(theme.transition.duration.normal, 'ms')}
      openDelay={openDelay ? openDelay : utils.handleReturnNumberFromString(theme.transition.duration.fast, 'ms')}
      hasArrow
      gutter={gutter}>
      <span>{children}</span>
    </CUITooltip>
  );
};

export default Tooltip;
