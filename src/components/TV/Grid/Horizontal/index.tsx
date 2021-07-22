import React, { ReactElement } from 'react';

import { PartialTV } from '../../../../common/types/tv';
import Empty from '../../../Empty';
import Error from '../../../Error';
import VerticalPoster from '../../Poster/Vertical';
import { GridProps } from '../types';

const HorizontalTV = ({ isError, isSuccess, tv }: GridProps): ReactElement => {
  return isError ? (
    <Error label='Oh no! Something went wrong' description='Failed to fetch TV list!' variant='transparent' />
  ) : isSuccess && tv && tv.length === 0 ? (
    <Empty label='TV list is currently empty!' variant='transparent' />
  ) : isSuccess && tv && tv.length > 0 ? (
    <>
      {tv.map((show: PartialTV, index: number) => (
        <VerticalPoster key={index} isLoading={false} show={show} />
      ))}
    </>
  ) : (
    <>
      {[...Array(tv ? tv.length : 20)].map((_dummy, index: number) => (
        <VerticalPoster key={index} isLoading />
      ))}
    </>
  );
};

export default HorizontalTV;
