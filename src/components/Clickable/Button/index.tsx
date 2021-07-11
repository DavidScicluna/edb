import React, { ReactElement } from 'react';

import { useTheme, useColorMode, Center, Spinner, Icon, Button as CUIButton } from '@chakra-ui/react';
import _ from 'lodash';

import { Theme } from '../../../theme/types';
import useStyles from './styles';
import { ButtonProps } from './types';

const Button = (props: ButtonProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();
  const style = useStyles(theme, props);

  const {
    children,
    leftIcon,
    rightIcon,
    isDisabled = false,
    isFullWidth = false,
    isLoading = false,
    size = 'md',
    variant = 'contained',
    ...rest
  } = props;

  /**
   * This method will return the appropriate spacing depending on the size passed
   *
   * @returns - Spacing number
   */
  const handleReturnSpacing = (): number => {
    switch (size) {
      case 'xs':
        return 0.5;
      case 'lg':
        return 1.5;
      default:
        return 1;
    }
  };

  return (
    <CUIButton
      {...rest}
      isDisabled={isLoading || isDisabled}
      isFullWidth={isFullWidth}
      variant='unstyled'
      sx={{ ..._.merge(style.button.back, style[colorMode].back[variant]) }}
      _disabled={{ ..._.merge(style.button.disabled, style[colorMode].disabled[variant]) }}>
      <Center className='button_front' sx={{ ..._.merge(style.button.front, style[colorMode].front[variant]) }}>
        {isLoading ? (
          <Spinner
            thickness={size === 'xs' ? '2px' : size === 'md' ? '3px' : '4px'}
            size={size}
            speed={theme.transition.duration.slow}
            sx={{ ..._.merge(style.button.icon) }}
          />
        ) : (
          <>
            {leftIcon ? (
              <Icon as={leftIcon} mr={children ? handleReturnSpacing() : 0} sx={{ ..._.merge(style.button.icon) }} />
            ) : null}
            {children}
            {rightIcon ? (
              <Icon as={rightIcon} ml={children ? handleReturnSpacing() : 0} sx={{ ..._.merge(style.button.icon) }} />
            ) : null}
          </>
        )}
      </Center>
    </CUIButton>
  );
};

export default Button;
