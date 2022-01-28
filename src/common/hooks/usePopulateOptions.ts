import { useEffect } from 'react';

import axios from 'axios';
import _ from 'lodash';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';

import {
  setCountries,
  setLanguages,
  setJobs,
  setMovieGenres,
  setTVGenres,
  setMovieCertifications,
  setTVCertifications
} from '../../store/slices/Options';
import {
  Country,
  Language,
  Job,
  Genre,
  Certifications as OptionsCertifications
} from '../../store/slices/Options/types';
import axiosInstance from '../scripts/axios';

export type Genres = {
  genres?: Genre[];
};

export type Certifications = {
  certifications?: OptionsCertifications;
};

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

  // Fetching movie certifications
  useQuery(
    'movie-certifications',
    async () => {
      const { data } = await axiosInstance.get<Certifications>('/certification/movie/list', {
        cancelToken: source.token
      });
      return data.certifications;
    },
    {
      retry: true,
      onSuccess: (certifications) => {
        if (!_.isNil(certifications) && !_.isEmpty(certifications)) {
          dispatch(setMovieCertifications({ ...(certifications || {}) }));
        }
      }
    }
  );

  // Fetching tv show certifications
  useQuery(
    'tv-show-certifications',
    async () => {
      const { data } = await axiosInstance.get<Certifications>('/certification/tv/list', {
        cancelToken: source.token
      });
      return data.certifications;
    },
    {
      retry: true,
      onSuccess: (certifications) => {
        if (!_.isNil(certifications) && !_.isEmpty(certifications)) {
          dispatch(setTVCertifications({ ...(certifications || {}) }));
        }
      }
    }
  );

  useEffect(() => {
    return () => source.cancel();
  }, []);
};

export default usePopulateOptions;
