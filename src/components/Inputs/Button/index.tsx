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

  const { children, leftIcon, rightIcon, isDisabled = false, isLoading = false, size = 'md', ...rest } = props;

  /**
   * This method will return the appropriate padding for the size passed
   *
   * @returns - Padding in rem from theme
   */
  const handleReturnPadding = (): string => {
    switch (size) {
      case 'xs':
        return `${theme.space[0.5]} ${theme.space[1]}`;
      case 'sm':
        return `${theme.space[0.75]} ${theme.space[1.5]}`;
      case 'lg':
        return `${theme.space[1.5]} ${theme.space[3]}`;
      default:
        return `${theme.space[1]} ${theme.space[2]}`;
    }
  };

  /**
   * This method will return the appropriate margin for the size passed
   *
   * @returns - Padding in rem from theme
   */
  const handleReturnMargin = (): string => {
    switch (size) {
      case 'xs':
        return theme.space[0.5];
      case 'sm':
        return theme.space[0.75];
      case 'lg':
        return theme.space[1.5];
      default:
        return theme.space[1];
    }
  };

  /**
   * This method will return the appropriate font-size for the size passed
   *
   * @returns - Icon size in rem from theme
   */
  const handleReturnIconSize = (): string => {
    switch (size) {
      case 'xs':
        return `${theme.fontSizes.md} !important`;
      case 'sm':
        return `${theme.fontSizes.lg} !important`;
      case 'lg':
        return `${theme.fontSizes['2xl']} !important`;
      default:
        return `${theme.fontSizes.xl} !important`;
    }
  };

  return (
    <CUIButton
      {...rest}
      isDisabled={isLoading || isDisabled}
      padding={handleReturnPadding()}
      sx={{ ..._.merge(style.common.button, style[colorMode].button) }}
      _disabled={{ ..._.merge(style.common.disabled, style[colorMode].disabled) }}
      variant='unstyled'>
      <Center
        sx={{
          border: 'none',
          backgroundColor: 'transparent'
        }}>
        {isLoading ? (
          <Spinner
            thickness={size === 'lg' ? '6px' : size === 'md' ? '4px' : '2px'}
            size={size}
            speed={theme.transition.duration.slow}
          />
        ) : (
          <>
            {leftIcon ? (
              <Icon
                as={leftIcon}
                sx={{
                  fontSize: handleReturnIconSize(),
                  marginRight: handleReturnMargin()
                }}
              />
            ) : null}
            {children}
            {rightIcon ? (
              <Icon
                as={rightIcon}
                sx={{
                  fontSize: handleReturnIconSize(),
                  marginLeft: handleReturnMargin()
                }}
              />
            ) : null}
          </>
        )}
      </Center>
    </CUIButton>
  );
};

export default Button;
