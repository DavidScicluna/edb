import React, { ReactElement } from 'react';

import { useMediaQuery, VStack, HStack, Box } from '@chakra-ui/react';
import axios from 'axios';
import { useQuery } from 'react-query';

import axiosInstance from '../../../../../../../common/scripts/axios';
import { FullPerson, MovieCredits, TVCredits } from '../../../../../../../common/types/person';
import { handleGetDepartments } from '../../../../../../../pages/Person';
import Poster from '../Poster';
import Container from './components/Container';
import { PersonProps } from './types';

const Person = (props: PersonProps): ReactElement => {
  const source = axios.CancelToken.source();

  const [isSm] = useMediaQuery('(max-width: 480px)');

  const { id } = props;

  // Fetching person details
  const personQuery = useQuery([`person-${id}`, id], async () => {
    const { data } = await axiosInstance.get<FullPerson>(`/person/${id}`, {
      cancelToken: source.token
    });
    return data;
  });

  // Fetching person movie credits
  const movieCreditsQuery = useQuery([`person-movie_credits-${id}`, id], async () => {
    const { data } = await axiosInstance.get<MovieCredits>(`/person/${id}/movie_credits`, {
      cancelToken: source.token
    });
    return data;
  });

  // Fetching person tv credits
  const tvCreditsQuery = useQuery([`person-tv_credits-${id}`, id], async () => {
    const { data } = await axiosInstance.get<TVCredits>(`/person/${id}/tv_credits`, {
      cancelToken: source.token
    });
    return data;
  });

  const departments =
    movieCreditsQuery.isSuccess && tvCreditsQuery.isSuccess
      ? handleGetDepartments(movieCreditsQuery.data, tvCreditsQuery.data)
      : [];

  return isSm ? (
    <VStack maxWidth='100%' spacing={2} p={2}>
      <Poster
        name={personQuery.data?.name || ''}
        path={personQuery.data?.profile_path || ''}
        mediaType='person'
        isLoading={personQuery.isFetching || personQuery.isLoading}
      />
      <Container
        person={personQuery.data}
        departments={departments.map((department) => department.label)}
        totalMovieCredits={movieCreditsQuery.data?.cast.length || 0}
        totalTvCredits={tvCreditsQuery.data?.cast.length || 0}
        totalCrewCredits={(movieCreditsQuery.data?.crew.length || 0) + (tvCreditsQuery.data?.crew.length || 0)}
        isLoading={personQuery.isFetching || personQuery.isLoading}
        isError={personQuery.isError || personQuery.isError}
      />
    </VStack>
  ) : (
    <HStack maxWidth='100%' spacing={2} p={2}>
      <Box width='40%'>
        <Poster
          name={personQuery.data?.name || ''}
          path={personQuery.data?.profile_path || ''}
          mediaType='person'
          isLoading={personQuery.isFetching || personQuery.isLoading}
        />
      </Box>
      <Box width='60%'>
        <Container
          person={personQuery.data}
          departments={departments.map((department) => department.label)}
          totalMovieCredits={movieCreditsQuery.data?.cast.length || 0}
          totalTvCredits={tvCreditsQuery.data?.cast.length || 0}
          totalCrewCredits={(movieCreditsQuery.data?.crew.length || 0) + (tvCreditsQuery.data?.crew.length || 0)}
          isLoading={personQuery.isFetching || personQuery.isLoading}
          isError={personQuery.isError || personQuery.isError}
        />
      </Box>
    </HStack>
  );
};

export default Person;
