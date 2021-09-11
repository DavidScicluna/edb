import React, { ReactElement } from 'react';

import { useColorMode, Text, useTheme, HStack } from '@chakra-ui/react';
import arraySort from 'array-sort';

import departments from '../../../../common/data/departments';
import { useSelector } from '../../../../common/hooks';
import utils from '../../../../common/utils/utils';
import { Theme } from '../../../../theme/types';
import Link from '../../../Clickable/Link';
import HorizontalScroll from '../../../HorizontalScroll';
import HorizontalPoster from '../../../Poster/Horizontal';
import SkeletonText from '../../../Skeleton/Text';
import { PosterProps } from '../types';

const dummyTextWidths = utils.handleReturnDummyWidths(100, 10);

const HorizontalPerson = ({ isLoading = true, person }: PosterProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  const color = useSelector((state) => state.user.ui.theme.color);

  return (
    <HorizontalPoster
      mediaItem={person ? { ...person } : undefined}
      mediaType='person'
      image={{
        alt: `${person?.name || ''} person poster`,
        src: person?.profile_path || '',
        size: {
          thumbnail: 'w45',
          full: 'original'
        }
      }}
      title={person?.name || ''}
      subtitle={
        departments.find((department) => department.value === person?.known_for_department)?.name ||
        person?.known_for_department ||
        ''
      }
      description={
        <HorizontalScroll isLoading={isLoading}>
          <HStack
            divider={
              <Text
                align='left'
                fontSize={['sm', 'md', 'lg', 'xl']}
                color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
                pr={0.75}>
                ,
              </Text>
            }>
            {arraySort(person?.known_for || [], 'vote_average').map((mediaItem, index) => (
              <Link
                key={index}
                to={{ pathname: `/${mediaItem?.title ? 'movie' : mediaItem?.name ? 'tv' : ''}/${mediaItem.id}` }}
                isDisabled={isLoading}>
                <SkeletonText
                  width={isLoading ? `${dummyTextWidths[Math.floor(Math.random() * dummyTextWidths.length)]}%` : '100%'}
                  offsetY={8.5}
                  isLoaded={!isLoading}>
                  <Text
                    align='left'
                    fontSize={['sm', 'md', 'lg', 'xl']}
                    color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
                    isTruncated
                    overflow='hidden'
                    whiteSpace='nowrap'
                    sx={{
                      transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`
                    }}
                    _hover={{ color: `${color}.${colorMode === 'light' ? 500 : 400}` }}>
                    {mediaItem?.title || mediaItem?.name || ''}
                  </Text>
                </SkeletonText>
              </Link>
            ))}
          </HStack>
        </HorizontalScroll>
      }
      isLoading={isLoading}
    />
  );
};

export default HorizontalPerson;
