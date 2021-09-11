import React, { ReactElement } from 'react';

import _ from 'lodash';

import departments from '../../../../common/data/departments';
import { PartialPerson } from '../../../../common/types/person';
import Empty from '../../../../components/Empty';
import Error from '../../../../components/Error';
import VerticalPoster from '../../../../components/Poster/Vertical';
import { HorizontalPeopleProps } from './types';

const HorizontalPeople = (props: HorizontalPeopleProps): ReactElement => {
  const { isError = false, isSuccess = false, isLoading = true, people } = props;

  return !isLoading && isError ? (
    <Error label='Oh no! Something went wrong' description='Failed to fetch people list!' variant='transparent' />
  ) : !isLoading && isSuccess && people && people.length === 0 ? (
    <Empty label='People list is currently empty!' variant='transparent' />
  ) : !isLoading && isSuccess && people && people.length > 0 ? (
    <>
      {people.map((person: PartialPerson) => (
        <VerticalPoster
          key={person.id}
          width={['185px', '205px', '230px']}
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
          isLoading={isLoading}
        />
      ))}
    </>
  ) : (
    <>
      {_.range(0, 20).map((_dummy, index: number) => (
        <VerticalPoster
          key={index}
          width={['185px', '205px', '230px']}
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
          isLoading
        />
      ))}
    </>
  );
};

export default HorizontalPeople;
