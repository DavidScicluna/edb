import React, { ReactElement } from 'react';

import { VStack, Fade, Collapse } from '@chakra-ui/react';

import HorizontalGrid from '../../../../components/Grid/Horizontal';
import VerticalMoviePoster from '../../../../components/Movies/Poster/Vertical';
import VerticalPersonPoster from '../../../../components/People/Poster/Vertical';
import VerticalShowPoster from '../../../../components/TV/Poster/Vertical';
import { AllProps } from './types';

const All = ({ movies = [], tv = [], people = [] }: AllProps): ReactElement => {
  return (
    <Fade
      in={(movies && movies.length > 0) || (tv && tv.length > 0) || (people && people.length > 0) || false}
      unmountOnExit
      style={{ width: '100%' }}>
      <VStack width='100%' spacing={6}>
        {/* Movies */}
        <Collapse in={(movies && movies.length > 0) || false} unmountOnExit style={{ width: '100%' }}>
          <HorizontalGrid
            title={`${movies.length || 0} liked movie${
              movies && (movies.length === 0 || movies.length > 1) ? 's' : ''
            }`}
            footer={`View all ${movies.length || 0} liked movie${
              movies && (movies.length === 0 || movies.length > 1 ? 's' : '')
            }`}
            isLoading={false}
            path={{ pathname: '/liked/movie' }}>
            <>
              {movies.map((movie, index) =>
                index < 20 ? <VerticalMoviePoster key={movie.id} isLoading={false} movie={movie} /> : null
              )}
            </>
          </HorizontalGrid>
        </Collapse>

        {/* TV */}
        <Collapse in={(tv && tv.length > 0) || false} unmountOnExit style={{ width: '100%' }}>
          <HorizontalGrid
            title={`${tv.length || 0} liked TV show${tv && (tv.length === 0 || tv.length > 1 ? 's' : '')}`}
            footer={`View all ${tv?.length || 0} liked TV show${tv && (tv.length === 0 || tv.length > 1 ? 's' : '')}`}
            isLoading={false}
            path={{ pathname: '/liked/tv' }}>
            <>
              {tv.map((show, index) =>
                index < 20 ? <VerticalShowPoster key={show.id} isLoading={false} show={show} /> : null
              )}
            </>
          </HorizontalGrid>
        </Collapse>

        {/* People */}
        <Collapse in={(people && people.length > 0) || false} unmountOnExit style={{ width: '100%' }}>
          <HorizontalGrid
            title={`${people.length || 0} liked ${
              (people && people.length === 0) || people.length > 1 ? 'people' : 'person'
            }`}
            footer={`View all ${people.length || 0} liked ${
              (people && people.length === 0) || people.length > 1 ? 'people' : 'person'
            }`}
            isLoading={false}
            path={{ pathname: '/liked/person' }}>
            <>
              {people.map((person, index) =>
                index < 20 ? <VerticalPersonPoster key={person.id} isLoading={false} person={person} /> : null
              )}
            </>
          </HorizontalGrid>
        </Collapse>
      </VStack>
    </Fade>
  );
};

export default All;
