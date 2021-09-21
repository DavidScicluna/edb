import { ReactElement } from 'react';

import { HStack, Text } from '@chakra-ui/react';

import { HeaderProps } from './types';

const Header = (props: HeaderProps): ReactElement => {
  const { actions, colorMode, title, ...rest } = props;

  return (
    <HStack {...rest} width='100%' justifyContent='space-between'>
      {title ? (
        typeof title === 'string' ? (
          <Text
            align='left'
            color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
            fontSize='lg'
            fontWeight='semibold'>
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
