import { ReactElement, forwardRef } from 'react';

import { useTheme, useColorMode, Center, Spinner, Icon, Button as CUIButton } from '@chakra-ui/react';
import _ from 'lodash';

import { ColorMode } from '../../../common/types/types';
import { Theme } from '../../../theme/types';
import useStyles from './styles';
import { ButtonRef, ButtonProps } from './types';

const Button = forwardRef<ButtonRef, ButtonProps>(function Button(props, ref): ReactElement {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  const style = useStyles(theme, props);

  const {
    children,
    colorMode: colorModeProp,
    leftIcon,
    rightIcon,
    isDisabled = false,
    isFullWidth = false,
    isLoading = false,
    size = 'md',
    variant = 'contained',
    ...rest
  } = _.omit(props, 'isLight');

  const mode: ColorMode = colorModeProp || colorMode;

  /**
   * This method will return the appropriate spacing depending on the size passed
   *
   * @returns - Spacing number
   */
  const handleReturnSpacing = (): number => {
    switch (size) {
      case 'sm':
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
      ref={ref}
      isDisabled={isLoading || isDisabled}
      isFullWidth={isFullWidth}
      variant='unstyled'
      sx={{ ..._.merge(style.button.back, style[mode].back[variant]) }}
      _disabled={{ ..._.merge(style.button.disabled, style[mode].disabled[variant]) }}>
      <Center className='button_front' sx={{ ..._.merge(style.button.front, style[mode].front[variant]) }}>
        {isLoading ? (
          <Spinner
            thickness={size === 'sm' ? '2px' : size === 'md' ? '3px' : '4px'}
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
});

export default Button;
