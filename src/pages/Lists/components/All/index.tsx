import React, { ReactElement, useEffect } from 'react';

import { VStack, Fade, Collapse } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

import HorizontalGrid from '../../../../components/Grid/Horizontal';
import VerticalMoviePoster from '../../../../components/Movies/Poster/Vertical';
import VerticalShowPoster from '../../../../components/TV/Poster/Vertical';
import { toggleDisplayMode } from '../../../../store/slices/App';
import { AllProps } from './types';

const All = ({ list, movies = [], tv = [] }: AllProps): ReactElement => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(toggleDisplayMode('grid'));
  }, []);

  return (
    <Fade in={(movies && movies.length > 0) || (tv && tv.length > 0) || false} unmountOnExit style={{ width: '100%' }}>
      <VStack width='100%' spacing={6}>
        {/* Movies */}
        <Collapse in={(movies && movies.length > 0) || false} unmountOnExit style={{ width: '100%' }}>
          <HorizontalGrid
            title={`${movies.length || 0} movie${movies && (movies.length === 0 || movies.length > 1) ? 's' : ''}`}
            footer={`View all ${movies.length || 0} movie${
              movies && (movies.length === 0 || movies.length > 1 ? 's' : '')
            } `}
            isLoading={false}
            path={{ pathname: `/lists/${list.id}/movie` }}>
            <>
              {movies.map((movie) => (
                <VerticalMoviePoster key={movie.id} isLoading={false} movie={movie} />
              ))}
            </>
          </HorizontalGrid>
        </Collapse>

        {/* TV */}
        <Collapse in={(tv && tv.length > 0) || false} unmountOnExit style={{ width: '100%' }}>
          <HorizontalGrid
            title={`${tv.length || 0} TV show${tv && (tv.length === 0 || tv.length > 1 ? 's' : '')}`}
            footer={`View all ${tv?.length || 0} TV show${tv && (tv.length === 0 || tv.length > 1 ? 's' : '')}`}
            isLoading={false}
            path={{ pathname: `/lists/${list.id}/tv` }}>
            <>
              {tv.map((show) => (
                <VerticalShowPoster key={show.id} isLoading={false} show={show} />
              ))}
            </>
          </HorizontalGrid>
        </Collapse>
      </VStack>
    </Fade>
  );
};

export default All;
