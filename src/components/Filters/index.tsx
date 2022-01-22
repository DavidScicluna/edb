import { ReactElement, useEffect } from 'react';

import { useMediaQuery, useDisclosure, VStack, HStack, Fade } from '@chakra-ui/react';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import axios from 'axios';
import _ from 'lodash';
import qs from 'query-string';
import { useForm, useFormState } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';

import { useSelector } from '../../common/hooks';
import axiosInstance from '../../common/scripts/axios';
import { Genres as GenresType, Certifications as CertificationsType } from '../../common/types';
import Modal from '../../components/Modal';
import Button from '../Clickable/Button';
import Adult from './components/Adult';
import Certifications from './components/Certifications';
import CountRange from './components/CountRange';
import Dates from './components/Dates';
import Genres from './components/Genres';
import RatingRange from './components/RatingRange';
import RuntimeRange from './components/RuntimeRange';
import { FiltersProps, Form } from './types';

export const defaultValues: Form = {
  date: [undefined, undefined],
  genres: [],
  certifications: [],
  rating: [],
  count: [],
  runtime: [],
  adult: false
};

const Filters = (props: FiltersProps): ReactElement => {
  const source = axios.CancelToken.source();

  const [isSm] = useMediaQuery('(max-width: 600px)');
  const [isLg] = useMediaQuery('(max-width: 1024px)');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const color = useSelector((state) => state.user.ui.theme.color);

  const location = useLocation();

  const { renderButton, mediaType, onFilter } = props;

  const form = useForm<Form>({ defaultValues });

  const { isDirty } = useFormState({ control: form.control });

  // Fetching Movie Genres
  const movieGenresQuery = useQuery(
    'movie-genres',
    async () => {
      const { data } = await axiosInstance.get<GenresType>('/genre/movie/list', {
        cancelToken: source.token
      });
      return data && data.genres ? data.genres : [];
    },
    { enabled: isOpen && mediaType === 'movie' }
  );

  // Fetching Movie Certifications
  const movieCertificationsQuery = useQuery(
    'movie-certifications',
    async () => {
      const { data } = await axiosInstance.get<CertificationsType>('/certification/movie/list', {
        cancelToken: source.token
      });
      return data.certifications && data.certifications.US ? data.certifications.US : undefined;
    },
    { enabled: isOpen && mediaType === 'movie' }
  );

  // Fetching TV Show Certifications
  const tvCertificationsQuery = useQuery(
    'tv-show-certifications',
    async () => {
      const { data } = await axiosInstance.get<CertificationsType>('/certification/tv/list', {
        cancelToken: source.token
      });
      return data.certifications && data.certifications.US ? data.certifications.US : undefined;
    },
    { enabled: isOpen && mediaType === 'tv' }
  );

  // Fetching TV Show Genres
  const tvGenresQuery = useQuery(
    'tv-genres',
    async () => {
      const { data } = await axiosInstance.get<GenresType>('/genre/tv/list', {
        cancelToken: source.token
      });
      return data && data.genres ? data.genres : [];
    },
    { enabled: isOpen && mediaType === 'tv' }
  );

  const handleReset = (): void => {
    form.setValue('date', defaultValues.date, { shouldDirty: true });
    form.setValue('genres', defaultValues.genres, { shouldDirty: true });
    form.setValue('certifications', defaultValues.certifications, { shouldDirty: true });
    form.setValue('rating', defaultValues.rating, { shouldDirty: true });
    form.setValue('count', defaultValues.count, { shouldDirty: true });
    form.setValue('runtime', defaultValues.runtime, { shouldDirty: true });
    form.setValue('adult', defaultValues.adult, { shouldDirty: true });
  };

  const handleSubmit = (values: Form): void => {
    onFilter({ ...values });

    onClose();

    setTimeout(() => form.reset({ ...values }), 500);
  };

  const handleOpen = (): void => {
    const search = qs.parse(location.search);

    if (!_.isEmpty(search) && search) {
      const filters: Form = { ...defaultValues };

      if (mediaType === 'movie') {
        if (
          search['primary_release_date.gte'] &&
          typeof search['primary_release_date.gte'] === 'string' &&
          search['primary_release_date.lte'] &&
          typeof search['primary_release_date.lte'] === 'string'
        ) {
          filters.date = [search['primary_release_date.gte'], search['primary_release_date.lte']];
        }
      } else if (mediaType === 'tv') {
        if (
          search['first_air_date.gte'] &&
          typeof search['first_air_date.gte'] === 'string' &&
          search['first_air_date.lte'] &&
          typeof search['first_air_date.lte'] === 'string'
        ) {
          filters.date = [search['first_air_date.gte'], search['first_air_date.lte']];
        }
      }

      if (search['with_genres'] && typeof search['with_genres'] === 'string') {
        filters.genres = search['with_genres'].split('.').map((genre) => Number(genre));
      }

      if (search['certification'] && typeof search['certification'] === 'string') {
        filters.certifications = search['certification'].split('|').map((certification) => certification);
      }

      if (
        search['vote_average.gte'] &&
        typeof search['vote_average.gte'] === 'string' &&
        search['vote_average.lte'] &&
        typeof search['vote_average.lte'] === 'string'
      ) {
        filters.rating = [Number(search['vote_average.gte']), Number(search['vote_average.lte'])];
      }

      if (
        search['vote_count.gte'] &&
        typeof search['vote_count.gte'] === 'string' &&
        search['vote_count.lte'] &&
        typeof search['vote_count.lte'] === 'string'
      ) {
        filters.count = [Number(search['vote_count.gte']), Number(search['vote_count.lte'])];
      }

      if (
        search['with_runtime.gte'] &&
        typeof search['with_runtime.gte'] === 'string' &&
        search['with_runtime.lte'] &&
        typeof search['with_runtime.lte'] === 'string'
      ) {
        filters.runtime = [Number(search['with_runtime.gte']), Number(search['with_runtime.lte'])];
      }

      if (search['include_adult'] && typeof search['include_adult'] === 'string') {
        filters.adult = Boolean(search['include_adult']);
      }

      form.reset({ ...filters });
    }

    onOpen();
  };

  const handleClose = (): void => {
    form.reset({ ...defaultValues });

    onClose();
  };

  useEffect(() => {
    return () => source.cancel();
  }, []);

  return (
    <>
      {renderButton({
        color: isOpen ? color : 'gray',
        icon: <VisibilityOutlinedIcon />,
        onClick: () => handleOpen()
      })}

      <Modal
        title='Filter'
        renderActions={({ color, colorMode, size }) => (
          <HStack spacing={isSm ? 1 : 2}>
            <Fade in={!_.isEqual(defaultValues, form.getValues())} unmountOnExit>
              <Button color={color} colorMode={colorMode} onClick={() => handleReset()} size={size} variant='text'>
                Reset
              </Button>
            </Fade>
            <Button
              color={color}
              colorMode={colorMode}
              isDisabled={!isDirty}
              onClick={form.handleSubmit((values) => handleSubmit(values))}
              size={size}
            >
              Search
            </Button>
          </HStack>
        )}
        isOpen={isOpen}
        onClose={handleClose}
        isCentered
        size={isLg ? 'full' : '5xl'}
      >
        <VStack width='100%' spacing={2} p={2}>
          <Dates form={form} mediaType={mediaType} />
          <Genres
            genres={
              mediaType === 'movie' && movieGenresQuery.data
                ? movieGenresQuery.data
                : mediaType === 'tv' && tvGenresQuery.data
                ? tvGenresQuery.data
                : []
            }
            form={form}
            isLoading={
              mediaType === 'movie'
                ? movieGenresQuery.isFetching || movieGenresQuery.isLoading
                : mediaType === 'tv'
                ? tvGenresQuery.isFetching || tvGenresQuery.isLoading
                : false
            }
            isError={
              mediaType === 'movie' ? movieGenresQuery.isError : mediaType === 'tv' ? tvGenresQuery.isError : false
            }
          />
          <Certifications
            certifications={
              mediaType === 'movie' && movieCertificationsQuery.data
                ? movieCertificationsQuery.data
                : mediaType === 'tv' && tvCertificationsQuery.data
                ? tvCertificationsQuery.data
                : []
            }
            form={form}
            isLoading={
              mediaType === 'movie'
                ? movieCertificationsQuery.isFetching || movieCertificationsQuery.isLoading
                : mediaType === 'tv'
                ? tvCertificationsQuery.isFetching || tvCertificationsQuery.isLoading
                : false
            }
            isError={
              mediaType === 'movie'
                ? movieCertificationsQuery.isError
                : mediaType === 'tv'
                ? tvCertificationsQuery.isError
                : false
            }
          />
          <RatingRange form={form} />
          <CountRange form={form} />
          <RuntimeRange form={form} />
          {mediaType === 'movie' ? <Adult form={form} mediaType={mediaType} /> : null}
        </VStack>
      </Modal>
    </>
  );
};

export default Filters;
