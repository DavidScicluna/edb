import { ReactElement, useContext } from 'react';

import { useColorMode, HStack, Text } from '@chakra-ui/react';

import { PanelContext } from '../../.';
import { handleReturnPadding } from '../../common/utils';
import { Context } from '../../types';
import { HeaderProps } from './types';

const Header = ({ actions, title }: HeaderProps): ReactElement => {
  const { colorMode } = useColorMode();

  const { size = 'md', variant = 'outlined' } = useContext<Context>(PanelContext);

  return (
    <HStack width='100%' alignItems='center' justifyContent='space-between' pb={handleReturnPadding(size, variant)}>
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
