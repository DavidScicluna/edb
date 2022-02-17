import { ReactElement } from 'react';

import _ from 'lodash';


import { VerticalPeopleProps } from './types';

import { PartialPerson } from '../../../../../common/types/person';
import Empty from '../../../../../components/Empty';
import Error from '../../../../../components/Error';
import VerticalGrid from '../../../../../components/Grid/Vertical';
import HorizontalPersonPoster from '../../Poster/Horizontal';
import VerticalPersonPoster from '../../Poster/Vertical';

const VerticalPeople = (props: VerticalPeopleProps): ReactElement => {
  const { isError = false, isSuccess = false, isLoading = true, people } = props;

  return !isLoading && isError ? (
    <Error label='Oh no! Something went wrong' description='Failed to fetch people list!' variant='outlined' />
  ) : !isLoading && isSuccess && people && people.length === 0 ? (
    <Empty label='People list is currently empty!' variant='outlined' />
  ) : !isLoading && isSuccess && people && people.length > 0 ? (
    <VerticalGrid>
      {({ displayMode }) =>
        people.map((person: PartialPerson) =>
          displayMode === 'list' ? (
            <HorizontalPersonPoster key={person.id} person={person} isLoading={false} />
          ) : (
            <VerticalPersonPoster key={person.id} person={person} isLoading={false} />
          )
        )
      }
    </VerticalGrid>
  ) : (
    <VerticalGrid>
      {({ displayMode }) =>
        _.range(0, isSuccess && people && people.length > 0 ? people.length : 20).map((_dummy, index: number) =>
          displayMode === 'list' ? (
            <HorizontalPersonPoster key={index} isLoading />
          ) : (
            <VerticalPersonPoster key={index} isLoading />
          )
        )
      }
    </VerticalGrid>
  );
};

export default VerticalPeople;
