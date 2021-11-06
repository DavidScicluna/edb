import { ReactElement, useState, useEffect } from 'react';

import { useDisclosure, VStack } from '@chakra-ui/react';
import sort from 'array-sort';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import axiosInstance from '../../common/scripts/axios';
import { FullPerson, Credits, MovieCredits, TVCredits, ImageResponse } from '../../common/types/person';
import { Response, ExternalIDs } from '../../common/types/types';
import MediaViewer from '../../components/MediaViewer';
import Bio from './components/Bio';
import Details from './components/Details';
import Filmography from './components/Filmography';
import KnownFor from './components/KnownFor';
import Photos from './components/Photos';
import { Department, KnownFor as KnownForType } from './types';

/**
 * This method will take all the credits and place them in their respective object
 *
 * @returns Array of Objects - Of Departments containing all credits
 */
export const handleGetDepartments = (movies: MovieCredits, tv: TVCredits): Department[] => {
  let departments: Department[] = [];

  if ((movies?.cast.length || 0) > 0 || (tv.cast.length || 0) > 0) {
    departments.push({
      label: 'Actor',
      credits: {
        cast: {
          movie: movies?.cast || [],
          tv: tv.cast || []
        }
      }
    });
  }

  movies?.crew.forEach((mediaItem) => {
    if (departments.some((department) => department.label === mediaItem.job)) {
      departments = departments.map((department) =>
        department.label === mediaItem.job
          ? {
              ...department,
              credits: {
                ...department.credits,
                crew: {
                  ...department.credits.crew,
                  movie: [...(department.credits.crew?.movie || []), { ...mediaItem }]
                }
              }
            }
          : department
      );
    } else {
      departments.push({
        label: mediaItem.job,
        credits: {
          crew: {
            movie: [{ ...mediaItem }],
            tv: []
          }
        }
      });
    }
  });

  tv.crew.forEach((mediaItem) => {
    if (departments.some((department) => department.label === mediaItem.job)) {
      departments = departments.map((department) =>
        department.label === mediaItem.job
          ? {
              ...department,
              credits: {
                ...department.credits,
                crew: {
                  ...department.credits.crew,
                  tv: [...(department.credits.crew?.tv || []), { ...mediaItem }]
                }
              }
            }
          : department
      );
    } else {
      departments.push({
        label: mediaItem.job,
        credits: {
          crew: {
            movie: [],
            tv: [{ ...mediaItem }]
          }
        }
      });
    }
  });

  return sort([...departments], 'label');
};

const Person = (): ReactElement => {
  const source = axios.CancelToken.source();

  const { isOpen: isMediaViewerOpen, onOpen: onMediaViewerOpen, onClose: onMediaViewerClose } = useDisclosure();

  const { id } = useParams<{ id: string }>();

  const [selectedPhoto, setSelectedPhoto] = useState<string>();

  // Fetching person details
  const personQuery = useQuery([`person-${id}`, id], async () => {
    const { data } = await axiosInstance.get<FullPerson>(`/person/${id}`, {
      cancelToken: source.token
    });
    return data;
  });

  // Fetching person known for list
  const creditsQuery = useQuery([`person-combined_credits-${id}`, id], async () => {
    const { data } = await axiosInstance.get<Credits>(`/person/${id}/combined_credits`, {
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

  // Fetching person external ids
  const externalIdsQuery = useQuery([`person-external_ids-${id}`, id], async () => {
    const { data } = await axiosInstance.get<ExternalIDs>(`/person/${id}/external_ids`, {
      cancelToken: source.token
    });
    return data;
  });

  // Fetching person images
  const imagesQuery = useQuery([`person-images-${id}`, id], async () => {
    const { data } = await axiosInstance.get<ImageResponse>(`/person/${id}/images`, {
      cancelToken: source.token
    });
    return data;
  });

  // Fetching person tagged images
  const taggedImagesQuery = useQuery([`person-tagged_images-${id}`, id], async () => {
    const { data } = await axiosInstance.get<Response<ImageResponse>>(`/person/${id}/tagged_images`, {
      cancelToken: source.token
    });
    return data;
  });

  /**
   * This method will filter from known for list and will return the 8 most voted movies/tv shows
   *
   * @returns Array of Objects - Known for list
   */
  const handleGetKnownFor = (): KnownForType => {
    const filtered = new Set();
    const credits = [...(creditsQuery.data?.cast || []), ...(creditsQuery.data?.crew || [])];
    const knownFor = sort(
      credits.filter((mediaItem) => {
        const duplicate = filtered.has(mediaItem.id);
        filtered.add(mediaItem.id);
        return !duplicate;
      }),
      'vote_count',
      { reverse: true }
    ).filter((_item, index) => index < 8);

    return [...knownFor];
  };

  /**
   * This method will open the image passed in the media modal
   *
   * @param image - Image object
   */
  const handleOnImageClick = (path: string): void => {
    setSelectedPhoto(path || undefined);
    onMediaViewerOpen();
  };

  const knownFor = creditsQuery.isSuccess ? handleGetKnownFor() : [];
  const departments =
    movieCreditsQuery.isSuccess && tvCreditsQuery.isSuccess
      ? handleGetDepartments(movieCreditsQuery.data, tvCreditsQuery.data)
      : [];

  useEffect(() => {
    return () => source.cancel();
  }, []);

  return (
    <VStack spacing={4} p={2}>
      <Details
        person={personQuery.data}
        departments={departments.map((department) => department.label)}
        socials={externalIdsQuery.data}
        isLoading={
          personQuery.isFetching || personQuery.isLoading || externalIdsQuery.isFetching || externalIdsQuery.isLoading
        }
        isError={personQuery.isError || personQuery.isError}
        onClickPoster={handleOnImageClick}
      />

      {personQuery.data?.biography || personQuery.isFetching || personQuery.isLoading ? (
        <Bio
          biography={personQuery.data?.biography || ''}
          isLoading={personQuery.isFetching || personQuery.isLoading}
        />
      ) : null}

      <KnownFor
        knownFor={knownFor}
        name={personQuery.data?.name}
        isError={creditsQuery.isError}
        isSuccess={creditsQuery.isSuccess}
        isLoading={creditsQuery.isFetching || creditsQuery.isLoading}
      />

      <Filmography
        departments={departments}
        isLoading={
          movieCreditsQuery.isFetching ||
          movieCreditsQuery.isLoading ||
          tvCreditsQuery.isFetching ||
          tvCreditsQuery.isLoading
        }
        isError={movieCreditsQuery.isError || tvCreditsQuery.isError}
      />

      <Photos
        images={[...(imagesQuery.data?.profiles || []), ...(taggedImagesQuery.data?.results.profiles || [])]}
        name={personQuery.data?.name}
        isError={imagesQuery.isError || taggedImagesQuery.isError}
        isSuccess={imagesQuery.isSuccess && taggedImagesQuery.isSuccess}
        isLoading={
          imagesQuery.isFetching || imagesQuery.isLoading || taggedImagesQuery.isFetching || taggedImagesQuery.isLoading
        }
        onClickImage={handleOnImageClick}
      />

      {imagesQuery.isSuccess || taggedImagesQuery.isSuccess ? (
        <MediaViewer
          isOpen={isMediaViewerOpen}
          selected={{
            type: 'photo',
            asset: selectedPhoto
          }}
          photos={[...(imagesQuery.data?.profiles || []), ...(taggedImagesQuery.data?.results.profiles || [])]}
          mediaType='person'
          onClose={onMediaViewerClose}
        />
      ) : null}
    </VStack>
  );
};

export default Person;
