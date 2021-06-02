import React, { ReactElement } from 'react';

import { useTheme, useColorMode, Center, Spinner, Icon, IconButton as CUIIconButton } from '@chakra-ui/react';
import _ from 'lodash';

import { Theme } from '../../../theme/types';
import useStyles from './styles';
import { IconButtonProps } from './types';

const IconButton = (props: IconButtonProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();
  const style = useStyles(theme, props);

  const { icon, isDisabled = false, isLoading = false, size = 'md', ...rest } = props;

  /**
   * This method will return the appropriate padding for the size passed
   *
   * @returns - Padding in rem from theme
   */
  const handleReturnPadding = (): string => {
    switch (size) {
      case 'xs':
        return theme.space[0.75];
      case 'sm':
        return theme.space[1];
      default:
        return theme.space[1.5];
    }
  };

  /**
   * This method will return the appropriate width, height & font-size for the size passed
   *
   * @returns - Icon size in rem from theme
   */
  const handleReturnIconSize = (): string => {
    switch (size) {
      case 'xs':
        return theme.fontSizes.xl;
      case 'sm':
        return theme.fontSizes['2xl'];
      case 'lg':
        return theme.fontSizes['5xl'];
      default:
        return theme.fontSizes['3xl'];
    }
  };

  return (
    <CUIIconButton
      {...rest}
      isDisabled={isLoading || isDisabled}
      padding={handleReturnPadding()}
      sx={{ ..._.merge(style.common.button, style[colorMode].button) }}
      _disabled={{ ..._.merge(style.common.disabled, style[colorMode].disabled) }}
      variant='unstyled'>
      <Center
        sx={{
          width: handleReturnIconSize(),
          height: handleReturnIconSize(),

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
          <Icon
            as={icon}
            size={size}
            sx={{
              fontSize: handleReturnIconSize()
            }}
          />
        )}
      </Center>
    </CUIIconButton>
  );
};

export default IconButton;
