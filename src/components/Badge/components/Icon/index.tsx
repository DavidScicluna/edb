import { ReactElement } from 'react';

import { useTheme } from '@chakra-ui/react';

import { handleConvertREMToPixels, handleConvertStringToNumber } from '../../../../common/utils';
import { Theme } from '../../../../theme/types';
import { IconProps } from './types';

const Icon = ({ icon: Icon, size = 'md' }: IconProps): ReactElement => {
  const theme = useTheme<Theme>();

  /**
   * This method will return the appropriate font-size in PX depending on size prop
   *
   * @returns - number: Font-size in PX
   */
  const handleReturnSize = (): number => {
    switch (size) {
      case 'xs':
        return handleConvertREMToPixels(handleConvertStringToNumber(theme.fontSizes.xs, 'rem')) + 2;
      case 'sm':
        return handleConvertREMToPixels(handleConvertStringToNumber(theme.fontSizes.sm, 'rem')) + 2;
      case 'lg':
        return handleConvertREMToPixels(handleConvertStringToNumber(theme.fontSizes.lg, 'rem')) + 2;
      case 'xl':
        return handleConvertREMToPixels(handleConvertStringToNumber(theme.fontSizes.xl, 'rem')) + 2;
      case '2xl':
        return handleConvertREMToPixels(handleConvertStringToNumber(theme.fontSizes['2xl'], 'rem')) + 2;
      case '3xl':
        return handleConvertREMToPixels(handleConvertStringToNumber(theme.fontSizes['3xl'], 'rem')) + 2;
      case '4xl':
        return handleConvertREMToPixels(handleConvertStringToNumber(theme.fontSizes['4xl'], 'rem')) + 2;
      case '5xl':
        return handleConvertREMToPixels(handleConvertStringToNumber(theme.fontSizes['5xl'], 'rem')) + 2;
      case '6xl':
        return handleConvertREMToPixels(handleConvertStringToNumber(theme.fontSizes['6xl'], 'rem')) + 2;
      case '7xl':
        return handleConvertREMToPixels(handleConvertStringToNumber(theme.fontSizes['7xl'], 'rem')) + 2;
      case '8xl':
        return handleConvertREMToPixels(handleConvertStringToNumber(theme.fontSizes['8xl'], 'rem')) + 2;
      case '9xl':
        return handleConvertREMToPixels(handleConvertStringToNumber(theme.fontSizes['9xl'], 'rem')) + 2;
      default:
        return handleConvertREMToPixels(handleConvertStringToNumber(theme.fontSizes.md, 'rem')) + 2;
    }
  };

  return <Icon size={handleReturnSize()} strokeWidth={2} />;
};

export default Icon;
