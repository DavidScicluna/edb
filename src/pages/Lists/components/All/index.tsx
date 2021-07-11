import React, { ReactElement, useEffect } from 'react';

import { VStack, Fade, Collapse } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import HorizontalGrid from '../../../../components/Grid/Horizontal';
import { toggleDisplayMode } from '../../../../store/slices/App';
import Movie from '../Movie';
import Show from '../Show';
import { AllProps } from './types';

const All = ({ list, movies = [], tv = [] }: AllProps): ReactElement => {
  const history = useHistory();

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
                <Movie key={movie.id} id={movie.id} />
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
                <Show key={show.id} id={show.id} />
              ))}
            </>
          </HorizontalGrid>
        </Collapse>
      </VStack>
    </Fade>
  );
};

export default All;
