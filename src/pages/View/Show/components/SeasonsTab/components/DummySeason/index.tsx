import { ReactElement } from 'react';

import { useTheme, useColorMode, HStack, VStack, Text, Icon } from '@chakra-ui/react';
import { ChevronRight as ChevronRightIcon } from 'react-feather';

import SkeletonText from '../../../../../../../components/Skeleton/Text';
import { Theme } from '../../../../../../../theme/types';

const DummySeason = (): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  return (
    <HStack
      width='100%'
      justifyContent='space-between'
      p={2}
      sx={{
        cursor: 'not-allowed',

        width: '100%',

        backgroundColor: 'transparent'
      }}>
      <VStack alignItems='flex-start' spacing={0}>
        <SkeletonText offsetY={9} isLoaded={false}>
          <Text align='left' color={colorMode === 'light' ? 'gray.900' : 'gray.50'} fontSize='lg' fontWeight='semibold'>
            Season 0
          </Text>
        </SkeletonText>
        <SkeletonText offsetY={6} isLoaded={false}>
          <Text align='left' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='xs'>
            Lorem Ipsum
          </Text>
        </SkeletonText>
      </VStack>

      <Icon
        as={ChevronRightIcon}
        sx={{
          color: colorMode === 'light' ? 'gray.400' : 'gray.500',

          fontSize: `${theme.fontSizes.xl} !important`
        }}
      />
    </HStack>
  );
};

export default DummySeason;
