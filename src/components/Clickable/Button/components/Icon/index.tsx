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
      case 'sm':
        return handleConvertREMToPixels(handleConvertStringToNumber(theme.fontSizes.xs, 'rem')) + 2;
      case 'lg':
        return handleConvertREMToPixels(handleConvertStringToNumber(theme.fontSizes.md, 'rem')) + 2;
      default:
        return handleConvertREMToPixels(handleConvertStringToNumber(theme.fontSizes.sm, 'rem')) + 2;
    }
  };

  return <Icon size={handleReturnSize()} strokeWidth={2} />;
};

export default Icon;
