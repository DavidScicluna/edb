import React, { ReactElement, useState, useEffect } from 'react';

import { useColorMode, useDisclosure, VStack, Box, Fade, Collapse } from '@chakra-ui/react';
import { SearchOutlined as SearchOutlinedIcon } from '@material-ui/icons/';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

import { PartialMovie } from '../../../../../../common/types/movie';
import { PartialPerson } from '../../../../../../common/types/person';
import { PartialTV } from '../../../../../../common/types/tv';
import { Response } from '../../../../../../common/types/types';
import HorizontalGrid from '../../../../../../components/Grid/Horizontal';
import IconButton from '../../../../../../components/Inputs/IconButton';
import Modal from '../../../../../../components/Modal';
import HorizontalMovies from '../../../../../../components/Movies/Grid/Horizontal';
import HorizontalPeople from '../../../../../../components/People/Grid/Horizontal';
import SearchForm from '../../../../../../components/SearchForm';
import HorizontalTV from '../../../../../../components/TV/Grid/Horizontal';

const Search = (): ReactElement => {
  const { colorMode } = useColorMode();
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();

  const location = useLocation();

  const [query, setQuery] = useState<string>('');

  const [movies, setMovies] = useState<Response<PartialMovie[]> | null>(null);
  const [tv, setTV] = useState<Response<PartialTV[]> | null>(null);
  const [people, setPeople] = useState<Response<PartialPerson[]> | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

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
              onIsLoading={(bool: boolean) => setIsLoading(bool)}
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
                  <HorizontalMovies isLoading={isLoading} isError={false} isSuccess movies={movies?.results || []} />
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
                  <HorizontalTV isLoading={isLoading} isError isSuccess tv={tv?.results || []} />
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
                  <HorizontalPeople isLoading={isLoading} isError={false} isSuccess people={people?.results || []} />
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
