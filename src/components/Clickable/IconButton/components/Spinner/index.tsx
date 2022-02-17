import { ReactElement } from 'react';
import { BounceLoader } from 'react-spinners';

import { useTheme } from '@chakra-ui/react';

import { css } from '@emotion/react';


import { SpinnerProps } from './types';

import { handleConvertREMToPixels, handleConvertStringToNumber } from '../../../../../common/utils';
import { Theme } from '../../../../../theme/types';

const Spinner = ({ color, colorMode, size = 'md', variant = 'contained' }: SpinnerProps): ReactElement => {
  const theme = useTheme<Theme>();

  /**
   * This method will return the appropriate color in HEX depending on color & colorMode props
   *
   * @returns - string: HEX color
   */
  const handleReturnColorHEX = (): string => {
    switch (variant) {
      case 'outlined':
      case 'icon': {
        if (colorMode === 'light') {
          return theme.colors[color][500];
        } else {
          return theme.colors[color][400];
        }
      }
      default: {
        if (colorMode === 'light') {
          return theme.colors.gray[50];
        } else {
          return theme.colors.gray[900];
        }
      }
    }
  };

  /**
   * This method will return the appropriate font-size in PX depending on size prop
   * After conversion it will decrease the pixel size by 2
   *
   * @returns - number: Font-size in PX
   */
  const handleReturnSize = (): number => {
    switch (size) {
      case 'sm':
        return handleConvertREMToPixels(handleConvertStringToNumber(theme.fontSizes.md, 'rem'));
      case 'lg':
        return handleConvertREMToPixels(handleConvertStringToNumber(theme.fontSizes['2xl'], 'rem'));
      default:
        return handleConvertREMToPixels(handleConvertStringToNumber(theme.fontSizes.xl, 'rem'));
    }
  };

  return (
    <BounceLoader
      color={handleReturnColorHEX()}
      size={handleReturnSize()}
      speedMultiplier={1}
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;
      `}
    />
  );
};

export default Spinner;
