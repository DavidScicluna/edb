import { ReactElement } from 'react';

import { useColorMode, useMediaQuery, VStack, HStack, Stack, Box, Link, Text, useTheme } from '@chakra-ui/react';
import moment from 'moment';

import { useSelector } from '../../../../common/hooks';
import { Theme } from '../../../../theme/types';
import { navItems } from '../../index';
import NavItem from './components/NavItem';

const Footer = (): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const color = useSelector((state) => state.user.ui.theme.color);

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

      <Stack width='100%' direction={isSm ? 'column' : 'row'} justifyContent='space-between'>
        <Text align='center' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='md' fontWeight='medium'>
          {`© ${moment().format('YYYY')} EDB, All rights reserved.`}
        </Text>

        <Text align='center' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='md' fontWeight='medium'>
          {'Made by'}{' '}
          <Link
            color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
            fontWeight='semibold'
            href='https://davidscicluna.com'
            isExternal
            sx={{
              transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`
            }}
            _focus={{ boxShadow: 'none' }}
            _hover={{ color: `${color}.${colorMode === 'light' ? 500 : 400}` }}
          >
            davidscicluna.com
          </Link>
        </Text>
      </Stack>
    </VStack>
  );
};

export default Footer;
