import { ReactElement } from 'react';

import { useColorMode, HStack, VStack, Avatar, Text } from '@chakra-ui/react';
import moment from 'moment';

import { HeaderProps } from './types';

const Header = (props: HeaderProps): ReactElement => {
  const { colorMode } = useColorMode();

  const { avatar, name, username, date } = props;

  return (
    <HStack>
      <Avatar name={name} src={`${process.env.REACT_APP_IMAGE_URL}${avatar}`} />
      <VStack alignItems='flex-start' spacing={0}>
        <Text align='left' color={colorMode === 'light' ? 'gray.900' : 'gray.50'} fontSize='xl' fontWeight='semibold'>
          {`Review by ${name}`}
        </Text>
        <HStack
          divider={
            <Text align='left' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='sm' mx={0.75}>
              •
            </Text>
          }>
          {[`@${username}`, moment(date).format('LLL')].map((item, index) => (
            <Text key={index} align='left' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='sm'>
              {item}
            </Text>
          ))}
        </HStack>
      </VStack>
    </HStack>
  );
};

export default Header;
