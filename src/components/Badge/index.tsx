import { ReactElement } from 'react';

import { ColorMode, useTheme, useColorMode, Badge as CUIBadge, HStack, Center } from '@chakra-ui/react';
import _ from 'lodash';

import { handleConvertREMToPixels, handleConvertStringToNumber } from '../../common/utils';
import { Theme, Space } from '../../theme/types';
import useStyles from './styles';
import { BadgeProps } from './types';

const Badge = (props: BadgeProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode: colorModeHook } = useColorMode();

  const {
    children,
    color = 'gray',
    colorMode: colorModeProp,
    renderLeftIcon,
    renderRightIcon,
    isLight = true,
    size = 'md',
    variant = 'contained'
  } = props;

  const colorMode: ColorMode = colorModeProp || colorModeHook;

  const style = useStyles(theme, { color, isLight, variant });

  /**
   * This method will return the appropriate spacing depending on the size passed
   *
   * @returns - number: Spacing value
   */
  const handleReturnSpacing = (): keyof Space => {
    switch (size) {
      case 'xl':
      case '2xl':
      case '3xl':
      case '4xl':
        return 1;
      default:
        return 0.5;
    }
  };

  /**
   * This method will return the appropriate font size depending on the size passed
   *
   * @returns - string: FontSizes value
   */
  const handleReturnFontSize = (): string => {
    switch (size) {
      case 'xs':
        return theme.fontSizes.xs;
      case 'sm':
        return theme.fontSizes.sm;
      case 'lg':
        return theme.fontSizes.lg;
      case 'xl':
        return theme.fontSizes.xl;
      case '2xl':
        return theme.fontSizes['2xl'];
      case '3xl':
        return theme.fontSizes['3xl'];
      case '4xl':
        return theme.fontSizes['4xl'];
      default:
        return theme.fontSizes.md;
    }
  };

  const iconHeightSize = `${
    handleConvertREMToPixels(handleConvertStringToNumber(handleReturnFontSize(), 'rem')) + 8
  }px`;

  return (
    <CUIBadge variant='unstyled' sx={{ ..._.merge(style.badge.default, style.badge[size], style[colorMode][variant]) }}>
      <HStack width='100%' spacing={handleReturnSpacing()}>
        {renderLeftIcon ? renderLeftIcon({ color, colorMode, height: iconHeightSize, fontSize: size }) : null}
        <Center>{children}</Center>
        {renderRightIcon ? renderRightIcon({ color, colorMode, height: iconHeightSize, fontSize: size }) : null}
      </HStack>
    </CUIBadge>
  );
};

export default Badge;
