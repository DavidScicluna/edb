import { ReactElement } from 'react';

import { VStack, Text, useColorMode } from '@chakra-ui/react';
import _ from 'lodash';

import SkeletonText from '../../../../../../../../../components/Skeleton/Text';
import { handleReturnDates } from '../../../../../../../../../pages/View/pages/Person/components/OverviewTab/components/Bio';
import Label from '../../../../components/Label';
import { BioProps } from './types';

const Bio = ({ birthday, place_of_birth, deathday, bio, isLoading = true }: BioProps): ReactElement => {
  const { colorMode } = useColorMode();

  return (
    <Label width='100%' label='Bio'>
      {!isLoading ? (
        <Text
          align='left'
          color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
          fontSize='md'
          isTruncated
          overflow='hidden'
          whiteSpace='normal'
          sx={{
            'display': '-webkit-box !important',
            '-webkit-line-clamp': '3',
            '-webkit-box-orient': 'vertical'
          }}
        >
          {bio
            ? _.compact([birthday ? handleReturnDates(birthday, deathday, place_of_birth) : undefined, bio]).join('')
            : ''}
        </Text>
      ) : (
        <VStack width='100%'>
          {_.range(0, 2).map((_dummy, index) => (
            <SkeletonText key={index} width='100%' fontSize='md' isLoaded={false}>
              <Text
                align='left'
                color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
                fontSize='md'
                whiteSpace='nowrap'
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Text>
            </SkeletonText>
          ))}
        </VStack>
      )}
    </Label>
  );
};

export default Bio;
