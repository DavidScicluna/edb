import React, { ReactElement } from 'react';

import { useTheme, useColorMode, useMediaQuery, SimpleGrid, HStack, Text } from '@chakra-ui/react';
import sort from 'array-sort';
import _ from 'lodash';

import departments from '../../../../common/data/departments';
import { useSelector } from '../../../../common/hooks';
import { PartialPerson } from '../../../../common/types/person';
import { handleReturnDummyWidths } from '../../../../common/utils';
import Link from '../../../../components/Clickable/Link';
import Empty from '../../../../components/Empty';
import Error from '../../../../components/Error';
import HorizontalScroll from '../../../../components/HorizontalScroll';
import HorizontalPoster from '../../../../components/Poster/Horizontal';
import VerticalPoster from '../../../../components/Poster/Vertical';
import SkeletonText from '../../../../components/Skeleton/Text';
import { Theme } from '../../../../theme/types';
import { VerticalPeopleProps } from './types';

const dummyTextWidths = handleReturnDummyWidths(100, 3);

const VerticalPeople = (props: VerticalPeopleProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();
  const [isSmallMob] = useMediaQuery('(max-width: 320px)');

  const displayMode = useSelector((state) => state.app.ui.displayMode);
  const color = useSelector((state) => state.user.ui.theme.color);

  const { isError = false, isSuccess = false, isLoading = true, people } = props;

  return !isLoading && isError ? (
    <Error label='Oh no! Something went wrong' description='Failed to fetch people list!' variant='outlined' />
  ) : !isLoading && isSuccess && people && people.length === 0 ? (
    <Empty label='People list is currently empty!' variant='outlined' />
  ) : !isLoading && isSuccess && people && people.length > 0 ? (
    <SimpleGrid width='100%' columns={displayMode === 'list' ? 1 : [isSmallMob ? 1 : 2, 2, 4, 5, 5, 6]} spacing={2}>
      {people.map((person: PartialPerson) =>
        displayMode === 'list' ? (
          <HorizontalPoster
            key={person.id}
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
              'N/A'
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
                  {sort(person?.known_for || [], 'vote_average').map((mediaItem, index) => (
                    <Link
                      key={index}
                      to={{ pathname: `/${mediaItem?.title ? 'movie' : mediaItem?.name ? 'tv' : ''}/${mediaItem.id}` }}
                      isDisabled={isLoading}>
                      <SkeletonText
                        width={
                          isLoading ? `${dummyTextWidths[Math.floor(Math.random() * dummyTextWidths.length)]}%` : '100%'
                        }
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
        ) : (
          <VerticalPoster
            key={person.id}
            width='100%'
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
              'N/A'
            }
            isLoading={isLoading}
          />
        )
      )}
    </SimpleGrid>
  ) : (
    <SimpleGrid width='100%' columns={displayMode === 'list' ? 1 : [isSmallMob ? 1 : 2, 2, 4, 5, 5, 6]} spacing={2}>
      {_.range(0, isSuccess && people && people.length > 0 ? people.length : 20).map((_dummy, index: number) =>
        displayMode === 'list' ? (
          <HorizontalPoster
            key={index}
            mediaType='person'
            image={{
              alt: 'Person poster',
              src: '',
              size: {
                thumbnail: 'w45',
                full: 'original'
              }
            }}
            title='Lorem ipsum'
            subtitle='2021 • Lorem ipsum dolor sit amet'
            description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            isLoading
          />
        ) : (
          <VerticalPoster
            key={index}
            width='100%'
            mediaType='person'
            title='Lorem ipsum'
            subtitle='2021 • Lorem ipsum dolor sit amet'
            isLoading
          />
        )
      )}
    </SimpleGrid>
  );
};

export default VerticalPeople;
