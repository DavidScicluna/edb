import { ReactElement } from 'react';

import { useColorMode, Text } from '@chakra-ui/react';

import { handleReturnDummyWidths, handleReturnDate } from '../../../../../../../../../../../common/utils';
import SkeletonText from '../../../../../../../../../../../components/Skeleton/Text';
import { DateProps } from './types';

const dummyTextWidths = handleReturnDummyWidths(100, 10);

const Date = (props: DateProps): ReactElement => {
  const { colorMode } = useColorMode();

  const { date, isLoading = false } = props;

  return (
    <SkeletonText
      width={isLoading ? `${dummyTextWidths[Math.floor(Math.random() * dummyTextWidths.length)]}%` : '100%'}
      offsetY={11.5}
      isLoaded={!isLoading}
    >
      <Text align='left' fontSize={['sm', 'md', 'lg', 'xl']} color={colorMode === 'light' ? 'gray.400' : 'gray.500'}>
        {!isLoading ? handleReturnDate(date, 'full') : 'Lorem ipsum'}
      </Text>
    </SkeletonText>
  );
};

export default Date;
