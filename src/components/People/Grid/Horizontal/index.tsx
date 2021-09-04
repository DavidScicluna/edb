import React, { ReactElement } from 'react';

import _ from 'lodash';

import { PartialPerson } from '../../../../common/types/person';
import Empty from '../../../Empty';
import Error from '../../../Error';
import VerticalPoster from '../../Poster/Vertical';
import { GridProps } from '../types';

const HorizontalPeople = ({ isError, isSuccess, people }: GridProps): ReactElement => {
  return isError ? (
    <Error label='Oh no! Something went wrong' description='Failed to fetch people list!' variant='transparent' />
  ) : isSuccess && people && people.length === 0 ? (
    <Empty label='People list is currently empty!' variant='transparent' />
  ) : isSuccess && people && people.length > 0 ? (
    <>
      {people.map((person: PartialPerson, index: number) => (
        <VerticalPoster key={index} isLoading={false} person={person} />
      ))}
    </>
  ) : (
    <>
      {[..._.range(20)].map((_dummy, index: number) => (
        <VerticalPoster key={index} isLoading />
      ))}
    </>
  );
};

export default HorizontalPeople;
