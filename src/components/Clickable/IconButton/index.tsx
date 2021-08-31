import React, { ReactElement, forwardRef } from 'react';

import { useTheme, useColorMode, Center, Spinner, Icon, IconButton as CUIIconButton } from '@chakra-ui/react';
import _ from 'lodash';

import { ColorMode } from '../../../common/types/types';
import { Theme } from '../../../theme/types';
import useStyles from './styles';
import { IconButtonRef, IconButtonProps } from './types';

const IconButton = forwardRef<IconButtonRef, IconButtonProps>(function IconButton(props, ref): ReactElement {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  const style = useStyles(theme, props);

  const {
    colorMode: colorModeProp,
    icon,
    isDisabled = false,
    isLoading = false,
    size = 'md',
    variant = 'contained',
    ...rest
  } = props;

  const mode: ColorMode = colorModeProp || colorMode;

  return (
    <CUIIconButton
      {...rest}
      ref={ref}
      isDisabled={isLoading || isDisabled}
      variant='unstyled'
      sx={{ ..._.merge(style.button.back, style[mode].back[variant]) }}
      _disabled={{ ..._.merge(style.button.disabled, style[mode].disabled[variant]) }}>
      <Center className='icon_button_front' sx={{ ..._.merge(style.button.front, style[mode].front[variant]) }}>
        {isLoading ? (
          <Spinner
            thickness={size === 'sm' ? '2px' : size === 'md' ? '3px' : '4px'}
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
