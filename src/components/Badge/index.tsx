import { ReactElement, useState } from 'react';

import { ColorMode, useTheme, useColorMode, Badge as CUIBadge, HStack, Center } from '@chakra-ui/react';
import _ from 'lodash';

import { handleConvertREMToPixels, handleConvertStringToNumber } from '../../common/utils';
import { Theme, Space } from '../../theme/types';
import SkeletonText from '../Skeleton/Text';
import useStyles from './styles';
import { BadgeProps } from './types';

const dummies = _.range(25, 150, 20);

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
    isLoading = false,
    size = 'md',
    variant = 'contained',
    sx
  } = props;

  const [dummy] = useState<number>(_.sample(dummies) || 100);

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

  const iconHeightSize = `${handleConvertREMToPixels(handleConvertStringToNumber(theme.fontSizes[size], 'rem')) + 8}px`;

  return (
    <CUIBadge
      variant='unstyled'
      sx={{ ..._.merge(style.badge.default, style.badge[size], style[colorMode][variant], sx) }}
    >
      <HStack width='100%' wrap='nowrap' spacing={handleReturnSpacing()}>
        {renderLeftIcon ? renderLeftIcon({ color, colorMode, height: iconHeightSize, fontSize: size }) : null}
        <SkeletonText
          as={Center}
          width={isLoading ? `${dummy}px` : 'auto'}
          color={color}
          fontSize={size}
          isLoaded={!isLoading}
        >
          {children}
        </SkeletonText>
        {renderRightIcon ? renderRightIcon({ color, colorMode, height: iconHeightSize, fontSize: size }) : null}
      </HStack>
    </CUIBadge>
  );
};

export default Badge;
