import React, { ReactElement } from 'react';

import { PartialTV } from '../../../../common/types/tv';
import Empty from '../../../Empty';
import Error from '../../../Error';
import VerticalPoster from '../../Poster/Vertical';
import { GridProps } from '../types';

const HorizontalTV = ({ isLoading, isError, isSuccess, tv }: GridProps): ReactElement => {
  return isLoading ? (
    <>
      {[...Array(tv ? tv.length : 20)].map((_dummy, index: number) => (
        <VerticalPoster key={index} isLoading />
      ))}
    </>
  ) : isSuccess && tv && tv.length > 0 ? (
    <>
      {tv.map((show: PartialTV, index: number) => (
        <VerticalPoster key={index} isLoading={false} show={show} />
      ))}
    </>
  ) : isError ? (
    <Error label='Oh no! Something went wrong' description='Failed to fetch TV list!' variant='transparent' />
  ) : (
    <Empty label='TV list is currently empty!' variant='transparent' />
  );
};

export default HorizontalTV;
