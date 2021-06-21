import React, { ReactElement, useState, useEffect } from 'react';

import { useColorMode, useDisclosure, VStack, Box, Fade, Collapse } from '@chakra-ui/react';
import { SearchOutlined as SearchOutlinedIcon } from '@material-ui/icons/';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

import { PartialMovie } from '../../../../../../common/types/movie';
import { PartialPerson } from '../../../../../../common/types/person';
import { PartialTV } from '../../../../../../common/types/tv';
import { Response } from '../../../../../../common/types/types';
import utils from '../../../../../../common/utils/utils';
import HorizontalGrid from '../../../../../../components/Grid/Horizontal';
import IconButton from '../../../../../../components/Inputs/IconButton';
import Modal from '../../../../../../components/Modal';
import VerticalPoster from '../../../../../../components/Poster/Vertical';
import SearchForm from '../../../../../../components/SearchForm';

const size = utils.handleReturnImageSize('poster', 'sm');

const Search = (): ReactElement => {
  const { colorMode } = useColorMode();
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();

  const location = useLocation();

  const [query, setQuery] = useState<string>('');

  const [movies, setMovies] = useState<Response<PartialMovie[]> | null>(null);
  const [tv, setTV] = useState<Response<PartialTV[]> | null>(null);
  const [people, setPeople] = useState<Response<PartialPerson[]> | null>(null);

  const handleResetModal = (): void => {
    setQuery('');

    setMovies(null);
    setTV(null);
    setPeople(null);
  };

  useEffect(() => {
    if (!isModalOpen) {
      setTimeout(() => {
        handleResetModal();
      }, 500);
    }
  }, [isModalOpen]);

  return (
    <>
      <IconButton
        aria-label='Open Search'
        disabled={location.pathname.includes('search')}
        icon={SearchOutlinedIcon}
        onClick={() => onModalOpen()}
        variant='icon'
        style={{ cursor: location.pathname.includes('search') ? 'default' : 'pointer' }}
      />

      <Modal title='Search' isOpen={isModalOpen} onClose={onModalClose} isCentered scrollBehavior='inside' size='full'>
        <VStack width='100%' spacing={0}>
          <Box width='100%' px={2} pt={4} pb={2}>
            <SearchForm
              query={query}
              onQueryChange={(query: string) => setQuery(query)}
              onMoviesChange={(data: Response<PartialMovie[]>) => setMovies(data)}
              onTVChange={(data: Response<PartialTV[]>) => setTV(data)}
              onPeopleChange={(data: Response<PartialPerson[]>) => setPeople(data)}
            />
          </Box>

          <Fade
            in={
              (movies && movies.results && movies.results.length > 0) ||
              (tv && tv.results && tv.results.length > 0) ||
              (people && people.results && people.results.length > 0) ||
              false
            }
            unmountOnExit
            style={{ width: '100%' }}>
            <VStack width='100%' backgroundColor={colorMode === 'light' ? 'gray.100' : 'gray.800'} spacing={6} pb={4}>
              {/* Movies */}
              <Collapse
                in={(movies && movies.results && movies.results.length > 0) || false}
                unmountOnExit
                style={{ width: '100%' }}>
                <HorizontalGrid
                  title={`Found ${movies?.total_results || 0} movie${
                    movies && movies.total_results
                      ? movies.total_results === 0 || movies.total_results > 1
                        ? 's'
                        : ''
                      : ''
                  } with "${query}"`}
                  footer={`View all ${movies?.total_results || 0} movie${
                    movies && movies.total_results
                      ? movies.total_results === 0 || movies.total_results > 1
                        ? 's'
                        : ''
                      : ''
                  } with "${query}"`}
                  isLoading={false}
                  path={{ pathname: '/search', search: queryString.stringify({ query, mediaType: 'movie' }) }}
                  onFooterClick={() => onModalClose()}>
                  <>
                    {movies?.results.map((movie: PartialMovie, index) => (
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
              <Collapse
                in={(tv && tv.results && tv.results.length > 0) || false}
                unmountOnExit
                style={{ width: '100%' }}>
                <HorizontalGrid
                  title={`Found ${tv?.total_results || 0} TV show${
                    tv && tv.total_results ? (tv.total_results === 0 || tv.total_results > 1 ? 's' : '') : ''
                  } with "${query}"`}
                  footer={`View all ${tv?.total_results || 0} TV show${
                    tv && tv.total_results ? (tv.total_results === 0 || tv.total_results > 1 ? 's' : '') : ''
                  } with "${query}"`}
                  isLoading={false}
                  path={{ pathname: '/search', search: queryString.stringify({ query, mediaType: 'tv' }) }}
                  onFooterClick={() => onModalClose()}>
                  <>
                    {tv?.results.map((tv: PartialTV, index) => (
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
                  path={{ pathname: '/search', search: queryString.stringify({ query, mediaType: 'person' }) }}
                  onFooterClick={() => onModalClose()}>
                  <>
                    {people?.results.map((person: PartialPerson, index) => (
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
        </VStack>
      </Modal>
    </>
  );
};

export default Search;
