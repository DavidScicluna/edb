import { ReactElement } from 'react';

import { useColorMode, HStack, Text } from '@chakra-ui/react';

import { Space } from '../../../../theme/types';
import { HeaderProps } from './types';

const Header = ({ actions, title, size = 'md' }: HeaderProps): ReactElement => {
  const { colorMode } = useColorMode();

  /**
   * This method will return the appropriate padding depending on the size passed
   *
   * @returns - number: Padding value
   */
  const handleReturnPadding = (): keyof Space => {
    switch (size) {
      case 'xs':
        return 1;
      case 'sm':
        return 1.5;
      case 'lg':
        return 2.5;
      case 'xl':
        return 3;
      default:
        return 2;
    }
  };

  return (
    <HStack width='100%' alignItems='stretch' justifyContent='space-between' pb={handleReturnPadding()}>
      {title ? (
        typeof title === 'string' ? (
          <Text align='left' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='md' fontWeight='bold'>
            {title}
          </Text>
        ) : (
          title
        )
      ) : null}

      {actions ? actions : null}
    </HStack>
  );
};

export default Header;
