import React, { ReactElement, forwardRef, ForwardedRef } from 'react';

import { useTheme, useColorMode, Center, Spinner, Icon, IconButton as CUIIconButton } from '@chakra-ui/react';
import _ from 'lodash';

import { Theme } from '../../../theme/types';
import useStyles from './styles';
import { IconButtonProps } from './types';

const IconButton = forwardRef(function IconButton(
  props: IconButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
): ReactElement {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();
  const style = useStyles(theme, props);

  const { icon, isDisabled = false, isLoading = false, size = 'md', variant = 'contained', ...rest } = props;

  return (
    <CUIIconButton
      {...rest}
      ref={ref}
      isDisabled={isLoading || isDisabled}
      variant='unstyled'
      sx={{ ..._.merge(style.button.back, style[colorMode].back[variant]) }}
      _disabled={{ ..._.merge(style.button.disabled, style[colorMode].disabled[variant]) }}>
      <Center className='icon_button_front' sx={{ ..._.merge(style.button.front, style[colorMode].front[variant]) }}>
        {isLoading ? (
          <Spinner
            thickness={size === 'xs' ? '2px' : size === 'md' ? '3px' : '4px'}
            size={size}
            speed={theme.transition.duration.slow}
            sx={{ ..._.merge(style.button.icon) }}
          />
        ) : (
          <Icon as={icon} sx={{ ..._.merge(style.button.icon) }} />
        )}
      </Center>
    </CUIIconButton>
  );
});

export default IconButton;
