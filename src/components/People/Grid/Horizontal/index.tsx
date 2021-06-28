import React, { ReactElement } from 'react';

import useSelector from '../../../../common/hooks/useSelectorTyped';
import { PartialPerson } from '../../../../common/types/person';
import Empty from '../../../Empty';
import Error from '../../../Error';
import VerticalPoster from '../../Poster/Vertical';
import { GridProps } from '../types';

const HorizontalPeople = ({ isLoading, isError, isSuccess, people }: GridProps): ReactElement => {
  const hasOptionsDownloaded = useSelector((state) => state.options.data.hasDownloaded);

  return isLoading && hasOptionsDownloaded ? (
    <>
      {[...Array(people ? people.length : 20)].map((_dummy, index: number) => (
        <VerticalPoster key={index} isLoading />
      ))}
    </>
  ) : isError ? (
    <Error label='Oh no! Something went wrong' description='Failed to fetch people list!' variant='transparent' />
  ) : isSuccess && people ? (
    <>
      {people.map((person: PartialPerson, index: number) => (
        <VerticalPoster key={index} isLoading={false} person={person} />
      ))}
    </>
  ) : (
    <Empty label='People list is currently empty!' variant='transparent' />
  );
};

export default HorizontalPeople;
