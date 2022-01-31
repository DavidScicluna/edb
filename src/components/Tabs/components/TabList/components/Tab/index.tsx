import { ReactElement } from 'react';

import { useTheme, useColorMode, Tab as CUITab, HStack, Center } from '@chakra-ui/react';
import _ from 'lodash';

import { useSelector } from '../../../../../../common/hooks';
import { handleConvertREMToPixels, handleConvertStringToNumber } from '../../../../../../common/utils';
import { FontSizes, Space, Theme } from '../../../../../../theme/types';
import useStyles from './styles';
import { Size, TabsProps } from './types';

/**
 * This method will return the appropriate spacing depending on the size passed
 *
 * @returns - number: Spacing value
 */
export const handleReturnSpacing = (size: Size): keyof Space => {
  switch (size) {
    case 'sm':
      return 0.5;
    case 'lg':
      return 2;
    default:
      return 1;
  }
};

/**
 * This method will return the appropriate font-size in PX depending on size prop
 *
 * @returns - number: Font-size in PX
 */
export const handleReturnIconSize = (size: Size, theme: Theme): number => {
  switch (size) {
    case 'sm':
      return handleConvertREMToPixels(handleConvertStringToNumber(theme.fontSizes.xs, 'rem')) + 2;
    case 'lg':
      return handleConvertREMToPixels(handleConvertStringToNumber(theme.fontSizes.md, 'rem')) + 3;
    default:
      return handleConvertREMToPixels(handleConvertStringToNumber(theme.fontSizes.sm, 'rem')) + 2;
  }
};

/**
 * This method will return the appropriate font-size in PX depending on size prop
 *
 * @returns - number: Font-size in PX
 */
export const handleReturnIconFontSize = (size: Size): keyof FontSizes => {
  switch (size) {
    case 'sm':
      return 'xs';
    case 'lg':
      return 'md';
    default:
      return 'sm';
  }
};

const Tab = (props: TabsProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  const color = useSelector((state) => state.user.ui.theme.color);

  const {
    label,
    renderLeftIcon,
    renderRightIcon,
    isDisabled = false,
    isFullWidth = false,
    isSelected = false,
    size = 'md'
  } = props;

  const style = useStyles(theme, { color, isFullWidth, isSelected });

  const iconSize = `${handleReturnIconSize(size, theme)}px`;
  const iconFontSize = handleReturnIconFontSize(size);

  return (
    <CUITab
      isDisabled={isDisabled}
      isSelected={isSelected}
      sx={{ ..._.merge(style.tab.default, style.tab[size], style[colorMode]) }}
      _disabled={{ ..._.merge(style.disabled) }}
    >
      <HStack width='100%' alignItems='inherit' justifyContent='inherit' spacing={handleReturnSpacing(size)}>
        {renderLeftIcon
          ? renderLeftIcon({
              width: iconSize,
              height: iconSize,
              fontSize: iconFontSize,
              isSelected: isSelected
            })
          : null}
        <Center>{label}</Center>
        {renderRightIcon
          ? renderRightIcon({
              width: iconSize,
              height: iconSize,
              fontSize: iconFontSize,
              isSelected: isSelected
            })
          : null}
      </HStack>
    </CUITab>
  );
};

export default Tab;
