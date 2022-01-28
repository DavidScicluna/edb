import { useEffect } from 'react';

import axios from 'axios';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';

import { setCountries, setLanguages, setJobs, setMovieGenres, setTVGenres } from '../../store/slices/Options';
import { Country, Language, Job, Genres } from '../../store/slices/Options/types';
import axiosInstance from '../scripts/axios';

const usePopulateOptions = (): void => {
  const source = axios.CancelToken.source();

  const dispatch = useDispatch();

  // Fetching countries
  useQuery(
    'countries',
    async () => {
      const { data } = await axiosInstance.get<Country[]>('/configuration/countries', {
        cancelToken: source.token
      });
      return data;
    },
    {
      retry: true,
      onSuccess: (countries) => {
        dispatch(setCountries([...countries]));
      }
    }
  );

  // Fetching languages
  useQuery(
    'languages',
    async () => {
      const { data } = await axiosInstance.get<Language[]>('/configuration/languages', {
        cancelToken: source.token
      });
      return data;
    },
    {
      retry: true,
      onSuccess: (languages) => {
        dispatch(setLanguages([...languages]));
      }
    }
  );

  // Fetching jobs
  useQuery(
    'jobs',
    async () => {
      const { data } = await axiosInstance.get<Job[]>('/configuration/jobs', {
        cancelToken: source.token
      });
      return data;
    },
    {
      retry: true,
      onSuccess: (jobs) => {
        dispatch(setJobs([...jobs]));
      }
    }
  );

  // Fetching movie genres
  useQuery(
    'movie-genres',
    async () => {
      const { data } = await axiosInstance.get<Genres>('/genre/movie/list', {
        cancelToken: source.token
      });
      return data.genres;
    },
    {
      retry: true,
      onSuccess: (genres) => {
        dispatch(setMovieGenres([...(genres || [])]));
      }
    }
  );

  // Fetching tv shows genres
  useQuery(
    'tv-show-genres',
    async () => {
      const { data } = await axiosInstance.get<Genres>('/genre/tv/list', {
        cancelToken: source.token
      });
      return data.genres;
    },
    {
      retry: true,
      onSuccess: (genres) => {
        dispatch(setTVGenres([...(genres || [])]));
      }
    }
  );

  useEffect(() => {
    return () => source.cancel();
  }, []);
};

export default usePopulateOptions;
