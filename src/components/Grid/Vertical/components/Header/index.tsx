import React, { ReactElement } from 'react';

import { useColorMode, HStack, Text } from '@chakra-ui/react';

type HeaderProps = {
  title: string;
  header: ReactElement;
};

const Header = ({ title, header }: HeaderProps): ReactElement => {
  const { colorMode } = useColorMode();

  return (
    <>
      <HStack width='100%' justify={title ? 'space-between' : 'flex-end'} p={[2]}>
        {title ? (
          <Text
            align='left'
            color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
            fontSize='2xl'
            fontWeight='semibold'
            textTransform='capitalize'>
            {title}
          </Text>
        ) : null}

        {header}
      </HStack>
    </>
  );
};

export default Header;
