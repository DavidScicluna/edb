import React, { ReactElement } from 'react';

import { useColorMode, HStack, Text } from '@chakra-ui/react';

import utils from '../../../../../common/utils/utils';
import Arrow from './components/Arrow';
import { HeaderProps } from './types';

const Header = (props: HeaderProps): ReactElement => {
  const { colorMode } = useColorMode();

  const { title, scrollButtons, variant = 'transparent', ...rest } = props;

  return (
    <HStack
      width='100%'
      justify='space-between'
      borderBottom={variant === 'outlined' ? 'solid2' : 'none'}
      borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
      px={variant === 'transparent' ? 2 : 0}
      py={variant === 'transparent' ? 2 : 1.25}>
      {typeof title === 'string' ? (
        <Text
          align='left'
          color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
          fontSize='2xl'
          fontWeight='semibold'
          textTransform='capitalize'>
          {title}
        </Text>
      ) : (
        title
      )}

      {/* Scroll buttons */}
      {!utils.handleIsTouchDevice() && (
        <HStack spacing={variant === 'transparent' ? 2 : 1.25}>
          <Arrow {...rest} direction='left' isDisabled={scrollButtons.left} variant={variant} />
          <Arrow {...rest} direction='right' isDisabled={scrollButtons.right} variant={variant} />
        </HStack>
      )}
    </HStack>
  );
};

export default Header;
