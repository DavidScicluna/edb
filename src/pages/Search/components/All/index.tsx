import React, { ReactElement } from 'react';

import { VStack, Fade, Collapse } from '@chakra-ui/react';
import queryString from 'query-string';

import HorizontalGrid from '../../../../components/Grid/Horizontal';
import HorizontalMovies from '../../../../components/Movies/Grid/Horizontal';
import HorizontalPeople from '../../../../components/People/Grid/Horizontal';
import HorizontalTV from '../../../../components/TV/Grid/Horizontal';
import { AllProps } from './types';

const All = ({ query, isLoading = false, movies, tv, people }: AllProps): ReactElement => {
  return (
    <Fade
      in={
        (movies && movies.results && movies.results.length > 0) ||
        (tv && tv.results && tv.results.length > 0) ||
        (people && people.results && people.results.length > 0) ||
        false
      }
      unmountOnExit
      style={{ width: '100%' }}>
      <VStack width='100%' spacing={6}>
        {/* Movies */}
        <Collapse
          in={(movies && movies.results && movies.results.length > 0) || false}
          unmountOnExit
          style={{ width: '100%' }}>
          <HorizontalGrid
            title={`Found ${movies?.total_results || 0} movie${
              movies && movies.total_results ? (movies.total_results === 0 || movies.total_results > 1 ? 's' : '') : ''
            } with "${query}"`}
            footer={`View all ${movies?.total_results || 0} movie${
              movies && movies.total_results ? (movies.total_results === 0 || movies.total_results > 1 ? 's' : '') : ''
            } with "${query}"`}
            isLoading={false}
            path={{ pathname: '/search', search: queryString.stringify({ query, mediaType: 'movie' }) }}>
            <HorizontalMovies isError={false} isSuccess={!isLoading} movies={movies?.results || []} />
          </HorizontalGrid>
        </Collapse>

        {/* TV */}
        <Collapse in={(tv && tv.results && tv.results.length > 0) || false} unmountOnExit style={{ width: '100%' }}>
          <HorizontalGrid
            title={`Found ${tv?.total_results || 0} TV show${
              tv && tv.total_results ? (tv.total_results === 0 || tv.total_results > 1 ? 's' : '') : ''
            } with "${query}"`}
            footer={`View all ${tv?.total_results || 0} TV show${
              tv && tv.total_results ? (tv.total_results === 0 || tv.total_results > 1 ? 's' : '') : ''
            } with "${query}"`}
            isLoading={false}
            path={{ pathname: '/search', search: queryString.stringify({ query, mediaType: 'tv' }) }}>
            <HorizontalTV isError={false} isSuccess={!isLoading} tv={tv?.results || []} />
          </HorizontalGrid>
        </Collapse>

        {/* People */}
        <Collapse
          in={(people && people.results && people.results.length > 0) || false}
          unmountOnExit
          style={{ width: '100%' }}>
          <HorizontalGrid
            title={`Found ${people?.total_results || 0} ${
              people && people.total_results
                ? people.total_results === 0 || people.total_results > 1
                  ? 'people'
                  : 'person'
                : ''
            } with "${query}"`}
            footer={`View all ${people?.total_results || 0} ${
              people && people.total_results
                ? people.total_results === 0 || people.total_results > 1
                  ? 'people'
                  : 'person'
                : ''
            } with "${query}"`}
            isLoading={false}
            path={{ pathname: '/search', search: queryString.stringify({ query, mediaType: 'person' }) }}>
            <HorizontalPeople isError={false} isSuccess={!isLoading} people={people?.results || []} />
          </HorizontalGrid>
        </Collapse>
      </VStack>
    </Fade>
  );
};

export default All;
