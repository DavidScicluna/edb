import React, { ReactElement } from 'react';

import { useColorMode, useMediaQuery, VStack, HStack, Box, Center, Text } from '@chakra-ui/react';
import moment from 'moment';

import navItems from '../../common/data/navItems';
import NavItem from './components/NavItem';

const Footer = (): ReactElement => {
  const { colorMode } = useColorMode();
  const [isSm] = useMediaQuery('(max-width: 600px)');

  return (
    <VStack width='100%' backgroundColor={colorMode === 'light' ? 'gray.100' : 'gray.800'} spacing={4} p={4} mt={4}>
      {isSm ? (
        <VStack width='100%' alignItems='flex-start' justifyContent='space-between' spacing={4}>
          {navItems.map((navItem, index) => (
            <NavItem key={index} {...navItem} />
          ))}
        </VStack>
      ) : (
        <HStack width='100%' alignItems='flex-start' justifyContent='space-between' spacing={2}>
          {navItems.map((navItem, index) => (
            <NavItem key={index} {...navItem} />
          ))}
        </HStack>
      )}

      <Box width='100%' height='2px' backgroundColor={colorMode === 'light' ? 'gray.200' : 'gray.700'} />

      <Center width='100%'>
        <Text align='center' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='md' fontWeight='medium'>
          {`© ${moment().format('YYYY')} EDB, All rights reserved.`}
        </Text>
      </Center>
    </VStack>
  );
};

export default Footer;
