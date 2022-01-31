import { ReactElement, useState } from 'react';

import { useColorMode, useMediaQuery, Text, ScaleFade } from '@chakra-ui/react';
import _ from 'lodash';
import moment from 'moment';

import SkeletonText from '../../../../../../../../components/Skeleton/Text';
import { DateProps } from './types';

const dummies = _.range(25, 100, 10);

const PersonDate = (props: DateProps): ReactElement => {
  const { colorMode } = useColorMode();
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const { birthday, place_of_birth, deathday, isLoading = false } = props;

  const [dummy] = useState<number>(_.sample(dummies) || 100);

  const handleReturnDates = (): string => {
    const birthDate = moment(birthday || '', 'YYYY-MM-DD').format('LL');
    const birthPlace = place_of_birth ? `in ${place_of_birth}` : undefined;
    const deathDate = deathday ? `- ${moment(deathday || '', 'YYYY-MM-DD').format('LL')}` : undefined;
    const yearsOld = deathday
      ? `(${moment(deathday || new Date()).diff(moment(birthday || '', 'YYYY-MM-DD'), 'years')} years old)`
      : undefined;

    return ['Born', 'on', birthDate, birthPlace, deathDate, yearsOld].filter((string) => string).join(' ');
  };

  return (
    <ScaleFade in={isLoading || !_.isEmpty(birthday) || !_.isNil(birthday)} unmountOnExit style={{ width: '100%' }}>
      <SkeletonText width={isLoading ? `${dummy}%` : 'auto'} fontSize='sm' isLoaded={!isLoading}>
        <Text
          align='left'
          color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
          fontSize={isSm ? 'xs' : 'sm'}
          isTruncated
          overflow='hidden'
          whiteSpace='nowrap'
        >
          {!isLoading ? handleReturnDates() : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,'}
        </Text>
      </SkeletonText>
    </ScaleFade>
  );
};

export default PersonDate;
