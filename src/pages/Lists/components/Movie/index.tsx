import React, { ReactElement, useEffect } from 'react';

import axios from 'axios';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';

import useSelector from '../../../../common/hooks/useSelectorTyped';
import axiosInstance from '../../../../common/scripts/axios';
import { PartialMovie } from '../../../../common/types/movie';
import HorizontalMoviePoster from '../../../../components/Movies/Poster/Horizontal';
import VerticalMoviePoster from '../../../../components/Movies/Poster/Vertical';

const Movie = ({ id }: { id: PartialMovie['id'] }): ReactElement => {
  const source = axios.CancelToken.source();

  const location = useLocation();

  const displayMode = useSelector((state) => state.app.ui.displayMode);

  // Fetching movie
  const movie = useQuery(`movie-${id}`, async () => {
    const { data } = await axiosInstance.get<PartialMovie>(`/movie/${id}`, {
      cancelToken: source.token
    });
    return data;
  });

  useEffect(() => {
    return () => source.cancel();
  }, []);

  return displayMode === 'list' ? (
    <HorizontalMoviePoster isLoading={movie.isFetching || movie.isLoading} movie={movie.data} />
  ) : (
    <VerticalMoviePoster
      width={location.search.length > 0 ? '100%' : ''}
      isLoading={movie.isFetching || movie.isLoading}
      movie={movie.data}
    />
  );
};

export default Movie;
