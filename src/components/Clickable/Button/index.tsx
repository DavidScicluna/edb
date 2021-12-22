import { ReactElement, forwardRef } from 'react';

import { ColorMode, useTheme, useColorMode, Button as CUIButton, Center, HStack } from '@chakra-ui/react';
import _ from 'lodash';

import { Theme, Space } from '../../../theme/types';
import Icon from './components/Icon';
import Spinner from './components/Spinner';
import useStyles from './styles';
import { ButtonRef, ButtonProps } from './types';

const Button = forwardRef<ButtonRef, ButtonProps>(function Button(props, ref): ReactElement {
  const theme = useTheme<Theme>();
  const { colorMode: colorModeHook } = useColorMode();

  const {
    children,
    color = 'gray',
    colorMode: colorModeProp,
    leftIcon,
    rightIcon,
    isDisabled = false,
    isFullWidth = false,
    isLoading = false,
    size = 'md',
    variant = 'contained',
    ...rest
  } = props;

  const colorMode: ColorMode = colorModeProp || colorModeHook;

  const style = useStyles(theme, { color, isFullWidth, isLoading, variant });

  /**
   * This method will return the appropriate spacing depending on the size passed
   *
   * @returns - number: Spacing value
   */
  const handleReturnSpacing = (): keyof Space => {
    switch (size) {
      case 'sm':
        return 0.5;
      case 'lg':
        return 2;
      default:
        return 1;
    }
  };

  return (
    <CUIButton
      {...rest}
      ref={ref}
      tabIndex={0}
      isDisabled={isLoading || isDisabled}
      isFullWidth={isFullWidth}
      variant='unstyled'
      sx={{ ..._.merge(style.button.back.default, style.button.back[size], style[colorMode].back[variant]) }}
      _disabled={{
        ..._.merge(style.button.disabled.default, style.button.disabled[size], style[colorMode].disabled[variant])
      }}
    >
      <Center
        className='button_front'
        sx={{ ..._.merge(style.button.front.default, style.button.front[size], style[colorMode].front[variant]) }}
      >
        {isLoading ? (
          <Spinner color={color} colorMode={colorMode} size={size} variant={variant} />
        ) : (
          <HStack width='100%' alignItems='inherit' justifyContent='inherit' spacing={handleReturnSpacing()}>
            {leftIcon ? <Icon icon={leftIcon} size={size} /> : null}
            {children ? <span>{children}</span> : null}
            {rightIcon ? <Icon icon={rightIcon} size={size} /> : null}
          </HStack>
        )}
      </Center>
    </CUIButton>
  );
});

export default Button;
