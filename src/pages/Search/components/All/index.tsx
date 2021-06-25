import React, { ReactElement } from 'react';

import { VStack, Fade, Collapse } from '@chakra-ui/react';
import queryString from 'query-string';

import { PartialMovie } from '../../../../common/types/movie';
import { PartialPerson } from '../../../../common/types/person';
import { PartialTV } from '../../../../common/types/tv';
import { Response } from '../../../../common/types/types';
import utils from '../../../../common/utils/utils';
import HorizontalGrid from '../../../../components/Grid/Horizontal';
import VerticalPoster from '../../../../components/Poster/Vertical';

export type AllProps = {
  query: string;
  movies: Response<PartialMovie[]> | null;
  tv: Response<PartialTV[]> | null;
  people: Response<PartialPerson[]> | null;
};

const size = utils.handleReturnImageSize('poster', 'sm');

const All = ({ query, movies, tv, people }: AllProps): ReactElement => {
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
            <>
              {movies?.results.map((movie: PartialMovie, index: number) => (
                <VerticalPoster
                  key={index}
                  width={['185px']}
                  mediaType='movie'
                  image={{
                    alt: `${movie?.title || ''} movie poster`,
                    src: movie?.poster_path || '',
                    size
                  }}
                  rating={{
                    rating: movie?.vote_average || null,
                    count: movie?.vote_count || null
                  }}
                  title={movie?.title || 'N/A'}
                  subtitle={`${utils.handleReturnDate(
                    movie?.release_date || '',
                    'year'
                  )} • ${utils.handleReturnGenresByID(movie?.genre_ids || [], 'movie')}`}
                  isLoaded={true}
                />
              ))}
            </>
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
            <>
              {tv?.results.map((tv: PartialTV, index: number) => (
                <VerticalPoster
                  key={index}
                  width={['185px']}
                  mediaType='tv'
                  image={{
                    alt: `${tv?.name || ''} TV poster`,
                    src: tv?.poster_path || '',
                    size
                  }}
                  rating={{
                    rating: tv?.vote_average || null,
                    count: tv?.vote_count || null
                  }}
                  title={tv?.name || 'N/A'}
                  subtitle={`${utils.handleReturnDate(
                    tv?.first_air_date || '',
                    'year'
                  )} • ${utils.handleReturnGenresByID(tv?.genre_ids || [], 'movie')}`}
                  isLoaded={true}
                />
              ))}
            </>
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
            <>
              {people?.results.map((person: PartialPerson, index: number) => (
                <VerticalPoster
                  key={index}
                  width={['185px']}
                  mediaType='person'
                  image={{
                    alt: `${person?.name || ''} person poster`,
                    src: person?.profile_path || '',
                    size
                  }}
                  title={person?.name || 'N/A'}
                  subtitle={person?.known_for_department || ''}
                  isLoaded={true}
                />
              ))}
            </>
          </HorizontalGrid>
        </Collapse>
      </VStack>
    </Fade>
  );
};

export default All;
