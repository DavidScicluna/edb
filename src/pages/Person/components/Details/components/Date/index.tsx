import React, { ReactElement } from 'react';

import { useColorMode, Text, ScaleFade } from '@chakra-ui/react';
import moment from 'moment';

import SkeletonText from '../../../../../../components/Skeleton/Text';
import { DateProps } from './types';

const PersonDate = (props: DateProps): ReactElement => {
  const { colorMode } = useColorMode();

  const { birthday, place_of_birth, deathday, isLoading = false, isError = false } = props;

  return (
    <ScaleFade in={isLoading ? true : !isError && (birthday || '')?.length > 0} unmountOnExit>
      <SkeletonText offsetY={7} isLoaded={!isLoading}>
        <Text align='left' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='sm'>
          {`Born on ${moment(birthday || '', 'YYYY-MM-DD').format('LL')}${
            place_of_birth ? ` in ${place_of_birth}` : ''
          }${deathday ? ` - ${moment(deathday || '', 'YYYY-MM-DD').format('LL')}` : ''} (${moment(
            deathday || new Date()
          ).diff(moment(birthday || '', 'YYYY-MM-DD'), 'years')} years old)`}
        </Text>
      </SkeletonText>
    </ScaleFade>
  );
};

export default PersonDate;
