import { ReactElement } from 'react';

import { ColorMode, useTheme, useColorMode, Badge as CUIBadge, HStack } from '@chakra-ui/react';
import _ from 'lodash';

import { Theme, Space } from '../../theme/types';
import Icon from './components/Icon';
import useStyles from './styles';
import { BadgeProps } from './types';

const Badge = (props: BadgeProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode: colorModeHook } = useColorMode();

  const {
    children,
    color = 'gray',
    colorMode: colorModeProp,
    leftIcon,
    rightIcon,
    size = 'md',
    variant = 'contained'
  } = props;

  const colorMode: ColorMode = colorModeProp || colorModeHook;

  const style = useStyles(theme, { color, variant });

  /**
   * This method will return the appropriate spacing depending on the size passed
   *
   * @returns - number: Spacing value
   */
  const handleReturnSpacing = (): keyof Space => {
    switch (size) {
      case 'xs':
        return 0.5;
      case 'sm':
        return 0.5;
      case 'lg':
      case 'xl':
      case '2xl':
      case '3xl':
      case '4xl':
      case '5xl':
        return 1;
      case '6xl':
      case '7xl':
        return 2;
      case '8xl':
        return 3;
      case '9xl':
        return 3;
      default:
        return 1;
    }
  };

  return (
    <CUIBadge variant='unstyled' sx={{ ..._.merge(style.badge.default, style.badge[size], style[colorMode][variant]) }}>
      <HStack width='100%' spacing={handleReturnSpacing()}>
        {leftIcon ? <Icon icon={leftIcon} size={size} /> : null}
        <span>{children}</span>
        {rightIcon ? <Icon icon={rightIcon} size={size} /> : null}
      </HStack>
    </CUIBadge>
  );
};

export default Badge;
