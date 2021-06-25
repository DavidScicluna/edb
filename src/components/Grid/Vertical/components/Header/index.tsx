import React, { ReactElement } from 'react';

import { useColorMode, HStack, Text, Collapse } from '@chakra-ui/react';

type HeaderProps = {
  title: string;
  header: ReactElement;
};

const Header = ({ title, header }: HeaderProps): ReactElement => {
  const { colorMode } = useColorMode();

  return (
    <Collapse in={Boolean(title && header)} style={{ width: '100%' }}>
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
    </Collapse>
  );
};

export default Header;
