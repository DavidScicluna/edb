import { ReactElement } from 'react';

import { useTheme, useColorMode, Tab as CUITab, HStack } from '@chakra-ui/react';
import _ from 'lodash';

import { useSelector } from '../../../../../../common/hooks';
import { handleConvertREMToPixels, handleConvertStringToNumber } from '../../../../../../common/utils';
import { Space, Theme } from '../../../../../../theme/types';
import useStyles from './styles';
import { TabsProps } from './types';

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
    isSelected,
    size = 'md'
  } = props;

  const style = useStyles(theme, { color, isFullWidth, isSelected });

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

  /**
   * This method will return the appropriate font-size in PX depending on size prop
   *
   * @returns - number: Font-size in PX
   */
  const handleReturnIconSize = (): number => {
    switch (size) {
      case 'sm':
        return handleConvertREMToPixels(handleConvertStringToNumber(theme.fontSizes.xs, 'rem')) + 2;
      case 'lg':
        return handleConvertREMToPixels(handleConvertStringToNumber(theme.fontSizes.md, 'rem')) + 3;
      default:
        return handleConvertREMToPixels(handleConvertStringToNumber(theme.fontSizes.sm, 'rem')) + 2;
    }
  };

  const iconSize = `${handleReturnIconSize()}px`;

  return (
    <CUITab
      isDisabled={isDisabled}
      isSelected={isSelected}
      sx={{ ..._.merge(style.tab.default, style.tab[size], style[colorMode]) }}
      _disabled={{ ..._.merge(style.disabled) }}
    >
      <HStack width='100%' alignItems='inherit' justifyContent='inherit' spacing={handleReturnSpacing()}>
        {renderLeftIcon
          ? renderLeftIcon({
              width: iconSize,
              height: iconSize,
              fontSize: iconSize,
              isSelected: isSelected
            })
          : null}
        <span>{label}</span>
        {renderRightIcon
          ? renderRightIcon({
              width: iconSize,
              height: iconSize,
              fontSize: iconSize,
              isSelected: isSelected
            })
          : null}
      </HStack>
    </CUITab>
  );
};

export default Tab;
