import React, { ReactElement } from 'react';

import { VStack, Fade, Collapse } from '@chakra-ui/react';
import queryString from 'query-string';

import useSelector from '../../../../common/hooks/useSelectorTyped';
import utils from '../../../../common/utils/utils';
import Button from '../../../../components/Clickable/Button';
import Link from '../../../../components/Clickable/Link';
import HorizontalGrid from '../../../../components/Grid/Horizontal';
import HorizontalMovies from '../../../../components/Movies/Grid/Horizontal';
import HorizontalPeople from '../../../../components/People/Grid/Horizontal';
import HorizontalTV from '../../../../components/TV/Grid/Horizontal';
import { AllProps } from './types';

const All = ({ query, isLoading = false, movies, tv, people }: AllProps): ReactElement => {
  const color = useSelector((state) => state.user.ui.theme.color);

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
            footer={
              <Link
                to={
                  !isLoading
                    ? { pathname: '/search', search: queryString.stringify({ query, mediaType: 'movie' }) }
                    : {}
                }>
                <Button color={utils.handleReturnColor(color)} isFullWidth isDisabled={isLoading} variant='text'>
                  {`View all ${movies?.total_results || 0} movie${
                    movies && movies.total_results
                      ? movies.total_results === 0 || movies.total_results > 1
                        ? 's'
                        : ''
                      : ''
                  } with "${query}"`}
                </Button>
              </Link>
            }
            isLoading={isLoading}>
            <HorizontalMovies isError={false} isSuccess={!isLoading} movies={movies?.results || []} />
          </HorizontalGrid>
        </Collapse>

        {/* TV */}
        <Collapse in={(tv && tv.results && tv.results.length > 0) || false} unmountOnExit style={{ width: '100%' }}>
          <HorizontalGrid
            title={`Found ${tv?.total_results || 0} TV show${
              tv && tv.total_results ? (tv.total_results === 0 || tv.total_results > 1 ? 's' : '') : ''
            } with "${query}"`}
            footer={
              <Link
                to={
                  !isLoading ? { pathname: '/search', search: queryString.stringify({ query, mediaType: 'tv' }) } : {}
                }>
                <Button color={utils.handleReturnColor(color)} isFullWidth isDisabled={isLoading} variant='text'>
                  {`View all ${tv?.total_results || 0} TV show${
                    tv && tv.total_results ? (tv.total_results === 0 || tv.total_results > 1 ? 's' : '') : ''
                  } with "${query}"`}
                </Button>
              </Link>
            }
            isLoading={isLoading}>
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
            footer={
              <Link
                to={
                  !isLoading
                    ? { pathname: '/search', search: queryString.stringify({ query, mediaType: 'person' }) }
                    : {}
                }>
                <Button color={utils.handleReturnColor(color)} isFullWidth isDisabled={isLoading} variant='text'>
                  {`View all ${people?.total_results || 0} ${
                    people && people.total_results
                      ? people.total_results === 0 || people.total_results > 1
                        ? 'people'
                        : 'person'
                      : ''
                  } with "${query}"`}
                </Button>
              </Link>
            }
            isLoading={isLoading}>
            <HorizontalPeople isError={false} isSuccess={!isLoading} people={people?.results || []} />
          </HorizontalGrid>
        </Collapse>
      </VStack>
    </Fade>
  );
};

export default All;
