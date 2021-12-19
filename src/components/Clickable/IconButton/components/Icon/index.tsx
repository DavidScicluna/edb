import { ReactElement } from 'react';

import { useTheme } from '@chakra-ui/react';

import { handleConvertREMToPixels, handleConvertStringToNumber } from '../../../../../common/utils';
import { Theme } from '../../../../../theme/types';
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
      case 'sm':
        return handleConvertREMToPixels(handleConvertStringToNumber(theme.fontSizes.md, 'rem'));
      case 'lg':
        return handleConvertREMToPixels(handleConvertStringToNumber(theme.fontSizes['2xl'], 'rem'));
      default:
        return handleConvertREMToPixels(handleConvertStringToNumber(theme.fontSizes.xl, 'rem'));
    }
  };

  return <Icon size={handleReturnSize()} strokeWidth={2} />;
};

export default Icon;
