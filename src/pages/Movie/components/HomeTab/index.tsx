import React, { ReactElement } from 'react';

import { VStack, ScaleFade } from '@chakra-ui/react';

import Cast from './components/Cast';
import Collection from './components/Collection';
import Details from './components/Details';
import Cover from './components/Details/components/Cover';
import Backdrop from './components/Details/components/Cover/components/Backdrop';
import Poster from './components/Details/components/Cover/components/Poster';
import Media from './components/Media';
import Recommendations from './components/Recommendations';
import { HomeTabProps } from './types';

const HomeTab = (props: HomeTabProps): ReactElement => {
  const {
    movieQuery,
    creditsQuery,
    imagesQuery,
    videosQuery,
    collectionsQuery,
    recommendationsQuery,
    onCoverClick,
    onMediaClick,
    onChangeTab
  } = props;

  return (
    <VStack spacing={4} p={2}>
      <Details
        renderCover={
          <Cover>
            {{
              poster: (
                <Poster
                  title={movieQuery.data?.title}
                  path={movieQuery.data?.poster_path}
                  isLoading={movieQuery.isFetching || movieQuery.isLoading}
                  isError={movieQuery.isError}
                  onClick={onCoverClick}
                />
              ),
              backdrop: (
                <Backdrop
                  title={movieQuery.data?.title}
                  path={movieQuery.data?.backdrop_path}
                  video={movieQuery.data?.video || (videosQuery.data?.results.length || 0) > 0}
                  isLoading={
                    movieQuery.isFetching || movieQuery.isLoading || videosQuery.isFetching || videosQuery.isLoading
                  }
                  isError={movieQuery.isError || videosQuery.isError}
                  onClick={onCoverClick}
                />
              )
            }}
          </Cover>
        }
        tagline={movieQuery.data?.tagline}
        overview={movieQuery.data?.overview}
        directors={creditsQuery.data?.crew.filter((crew) => crew.job === 'Director')}
        executiveProducer={creditsQuery.data?.crew.filter((crew) => crew.job === 'Executive Producer')}
        producers={creditsQuery.data?.crew.filter((crew) => crew.job === 'Producer')}
        writers={creditsQuery.data?.crew.filter((crew) => crew.job === 'Writer')}
        budget={movieQuery.data?.budget}
        revenue={movieQuery.data?.revenue}
        originalLanguage={movieQuery.data?.original_language}
        languages={movieQuery.data?.spoken_languages}
        isLoading={{
          details: imagesQuery.isFetching || imagesQuery.isLoading,
          credits: creditsQuery.isFetching || creditsQuery.isLoading
        }}
      />

      <Cast
        cast={creditsQuery.data?.cast}
        name={movieQuery.data?.title}
        isError={creditsQuery.isError}
        isSuccess={creditsQuery.isSuccess}
        isLoading={creditsQuery.isFetching || creditsQuery.isLoading}
        onViewCastCrewTab={() => onChangeTab(1)}
      />

      <Media
        name={movieQuery.data?.title}
        photos={imagesQuery.data?.posters}
        backdrops={imagesQuery.data?.backdrops}
        videos={videosQuery.data?.results}
        isError={{
          images: imagesQuery.isError,
          videos: videosQuery.isError
        }}
        isSuccess={{
          images: imagesQuery.isSuccess,
          videos: videosQuery.isSuccess
        }}
        isLoading={{
          images: imagesQuery.isFetching || imagesQuery.isLoading,
          videos: videosQuery.isFetching || videosQuery.isLoading
        }}
        onClick={onMediaClick}
      />

      <ScaleFade
        in={collectionsQuery.isSuccess && Boolean(collectionsQuery.data)}
        unmountOnExit
        style={{ width: '100%' }}>
        <Collection name={collectionsQuery.data?.name || ''} parts={collectionsQuery.data?.parts || []} />
      </ScaleFade>

      <Recommendations
        recommendations={recommendationsQuery.data}
        name={movieQuery.data?.title}
        isError={recommendationsQuery.isError}
        isSuccess={recommendationsQuery.isSuccess}
        isLoading={recommendationsQuery.isFetching || recommendationsQuery.isLoading}
      />
    </VStack>
  );
};

export default HomeTab;
