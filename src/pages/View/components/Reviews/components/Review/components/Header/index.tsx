import { ReactElement } from 'react';

import { useColorMode, useMediaQuery, HStack, VStack, Text } from '@chakra-ui/react';
import moment from 'moment';

import SkeletonText from '../../../../../../../../components/Skeleton/Text';
import Image from './components/Image';
import { HeaderProps } from './types';

// TODO: Check if author is user and render header text differently

const Header = (props: HeaderProps): ReactElement => {
  const { colorMode } = useColorMode();
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const { avatar, name, username, date, isLoading = true } = props;

  return (
    <HStack>
      <Image alt={`${name} (${username}) Avatar`} avatar={avatar} isLoading={isLoading} />

      <VStack alignItems='flex-start' spacing={isLoading ? 0.5 : 0}>
        <SkeletonText isLoaded={!isLoading} offsetY={10}>
          <Text align='left' color={colorMode === 'light' ? 'gray.900' : 'gray.50'} fontSize='xl' fontWeight='semibold'>
            {!isSm ? `Review by ${name}` : name}
          </Text>
        </SkeletonText>
        <HStack
          divider={
            <Text align='left' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='sm' mx={0.75}>
              •
            </Text>
          }>
          {[isLoading ? '@Lorem' : `@${username}`, date ? moment(date).format('LLL') : undefined]
            .filter((item) => item)
            .map((item, index) => (
              <SkeletonText key={index} isLoaded={!isLoading} offsetY={6}>
                <Text align='left' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='sm'>
                  {item}
                </Text>
              </SkeletonText>
            ))}
        </HStack>
      </VStack>
    </HStack>
  );
};

export default Header;
