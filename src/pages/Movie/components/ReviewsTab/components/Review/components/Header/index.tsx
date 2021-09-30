import { ReactElement } from 'react';

import { useColorMode, HStack, VStack, AspectRatio, Image, Text } from '@chakra-ui/react';
import moment from 'moment';

import { handleReturnFallbackSrc } from '../../../../../../../../common/utils';
import { HeaderProps } from './types';

const Header = (props: HeaderProps): ReactElement => {
  const { colorMode } = useColorMode();

  const { avatar, name, username, date } = props;

  const alt = `${name} (${username}) Avatar`;

  /**
   * This method will check if avatar url has a / in the beginning of the string
   * If so it will remove it
   *
   * @returns String - Avatar URL
   */
  const handleSrc = (): string => {
    if (avatar && avatar.charAt(0) === '/') {
      return avatar.substring(1);
    }
    return avatar || '';
  };

  return (
    <HStack>
      <AspectRatio width='48px' borderRadius='full' ratio={1 / 1}>
        <Image
          alt={alt}
          borderRadius='full'
          src={handleSrc() || ''}
          fallbackSrc={handleReturnFallbackSrc('person', '780', alt)}
        />
      </AspectRatio>
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
