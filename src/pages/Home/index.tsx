import React, { ReactElement, useEffect } from 'react';

import { VStack } from '@chakra-ui/react';
import axios from 'axios';
import { useQuery } from 'react-query';

import useSelector from '../../common/hooks/useSelectorTyped';
import axiosInstance from '../../common/scripts/axios';
import { PartialMovie } from '../../common/types/movie';
import { PartialPerson } from '../../common/types/person';
import { PartialTV } from '../../common/types/tv';
import { Response } from '../../common/types/types';
import utils from '../../common/utils/utils';
import Button from '../../components/Clickable/Button';
import Link from '../../components/Clickable/Link';
import HorizontalGrid from '../../components/Grid/Horizontal';
import HorizontalMovies from '../../components/Movies/Grid/Horizontal';
import HorizontalPeople from '../../components/People/Grid/Horizontal';
import HorizontalTV from '../../components/TV/Grid/Horizontal';

const Home = (): ReactElement => {
  const source = axios.CancelToken.source();

  const color = useSelector((state) => state.user.ui.theme.color);

  // Fetching popular movies
  const popularMovies = useQuery('popularMovies', async () => {
    const { data } = await axiosInstance.get<Response<PartialMovie[]>>('/movie/popular', {
      cancelToken: source.token
    });
    return data.results;
  });

  // Fetching trending movies
  const trendingMovies = useQuery('trendingMovies', async () => {
    const { data } = await axiosInstance.get<Response<PartialMovie[]>>('/trending/movie/day', {
      cancelToken: source.token
    });
    return data.results;
  });

  // Fetching popular TV
  const popularTV = useQuery('popularTV', async () => {
    const { data } = await axiosInstance.get<Response<PartialTV[]>>('/tv/popular', {
      cancelToken: source.token
    });
    return data.results;
  });

  // Fetching trending TV
  const trendingTV = useQuery('trendingTV', async () => {
    const { data } = await axiosInstance.get<Response<PartialTV[]>>('/trending/tv/day', {
      cancelToken: source.token
    });
    return data.results;
  });

  // Fetching trending People
  const trendingPeople = useQuery('trendingPeople', async () => {
    const { data } = await axiosInstance.get<Response<PartialPerson[]>>('/trending/person/day', {
      cancelToken: source.token
    });
    return data.results;
  });

  useEffect(() => {
    return () => source.cancel();
  }, []);

  return (
    <VStack spacing={6}>
      <HorizontalGrid
        title='Popular movies'
        footer={
          <Link to={!popularMovies.isFetching || !popularMovies.isLoading ? { pathname: '/movies/popular' } : {}}>
            <Button
              color={utils.handleReturnColor(color)}
              isFullWidth
              isDisabled={popularMovies.isFetching || popularMovies.isLoading}
              variant='text'>
              View all Popular movies
            </Button>
          </Link>
        }
        isLoading={popularMovies.isFetching || popularMovies.isLoading}>
        <HorizontalMovies
          isError={popularMovies.isError}
          isSuccess={popularMovies.isSuccess && !popularMovies.isFetching && !popularMovies.isLoading}
          movies={popularMovies.data}
        />
      </HorizontalGrid>

      <HorizontalGrid
        title='Trending movies'
        footer={
          <Link to={!trendingMovies.isFetching || !trendingMovies.isLoading ? { pathname: '/trending/movie' } : {}}>
            <Button
              color={utils.handleReturnColor(color)}
              isFullWidth
              isDisabled={trendingMovies.isFetching || trendingMovies.isLoading}
              variant='text'>
              View all Trending movies
            </Button>
          </Link>
        }
        isLoading={trendingMovies.isFetching || trendingMovies.isLoading}>
        <HorizontalMovies
          isError={trendingMovies.isError}
          isSuccess={trendingMovies.isSuccess && !trendingMovies.isFetching && !trendingMovies.isLoading}
          movies={trendingMovies.data}
        />
      </HorizontalGrid>

      <HorizontalGrid
        title='Popular TV'
        footer={
          <Link to={!popularTV.isFetching || !popularTV.isLoading ? { pathname: '/tv/popular' } : {}}>
            <Button
              color={utils.handleReturnColor(color)}
              isFullWidth
              isDisabled={popularTV.isFetching || popularTV.isLoading}
              variant='text'>
              View all Popular TV
            </Button>
          </Link>
        }
        isLoading={popularTV.isFetching || popularTV.isLoading}>
        <HorizontalTV
          isError={popularTV.isError}
          isSuccess={popularTV.isSuccess && !popularTV.isFetching && !popularTV.isLoading}
          tv={popularTV.data}
        />
      </HorizontalGrid>

      <HorizontalGrid
        title='Trending TV'
        footer={
          <Link to={!trendingTV.isFetching || !trendingTV.isLoading ? { pathname: '/trending/tv' } : {}}>
            <Button
              color={utils.handleReturnColor(color)}
              isFullWidth
              isDisabled={trendingTV.isFetching || trendingTV.isLoading}
              variant='text'>
              View all Trending TV
            </Button>
          </Link>
        }
        isLoading={trendingTV.isFetching || trendingTV.isLoading}>
        <HorizontalTV
          isError={trendingTV.isError}
          isSuccess={trendingTV.isSuccess && !trendingTV.isFetching && !trendingTV.isLoading}
          tv={trendingTV.data}
        />
      </HorizontalGrid>

      <HorizontalGrid
        title='Trending People'
        footer={
          <Link to={!trendingPeople.isFetching || !trendingPeople.isLoading ? { pathname: '/trending/person' } : {}}>
            <Button
              color={utils.handleReturnColor(color)}
              isFullWidth
              isDisabled={trendingPeople.isFetching || trendingPeople.isLoading}
              variant='text'>
              View all Trending People
            </Button>
          </Link>
        }
        isLoading={trendingPeople.isFetching || trendingPeople.isLoading}>
        <HorizontalPeople
          isError={trendingPeople.isError}
          isSuccess={trendingPeople.isSuccess && !trendingPeople.isFetching && !trendingPeople.isLoading}
          people={trendingPeople.data}
        />
      </HorizontalGrid>
    </VStack>
  );
};

export default Home;
