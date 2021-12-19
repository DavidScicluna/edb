import { ReactElement } from 'react';

import { VStack } from '@chakra-ui/react';

import Cover from '../../../components/Cover';
import Backdrop from '../../../components/Cover/components/Backdrop';
import Poster from '../../../components/Cover/components/Poster';
import Details from '../../../components/Details';
import Media from '../../../components/Media';
import Cast from './components/Cast';
import Info from './components/Info';
import Recommendations from './components/Recommendations';
import { HomeTabProps } from './types';

const HomeTab = (props: HomeTabProps): ReactElement => {
  const {
    tvShowQuery,
    creditsQuery,
    imagesQuery,
    videosQuery,
    recommendationsQuery,
    onCoverClick,
    onMediaClick,
    onChangeTab
  } = props;

  return (
    <VStack width='100%' maxWidth='100%' spacing={4}>
      <Details
        renderCover={
          <Cover>
            {{
              poster: (
                <Poster
                  title={tvShowQuery.data?.name}
                  path={tvShowQuery.data?.poster_path}
                  isLoading={tvShowQuery.isFetching || tvShowQuery.isLoading}
                  isError={tvShowQuery.isError}
                  onClick={onCoverClick}
                />
              ),
              backdrop: (
                <Backdrop
                  title={tvShowQuery.data?.name}
                  path={tvShowQuery.data?.backdrop_path}
                  video={(videosQuery.data?.results.length || 0) > 0}
                  isLoading={
                    tvShowQuery.isFetching || tvShowQuery.isLoading || videosQuery.isFetching || videosQuery.isLoading
                  }
                  isError={tvShowQuery.isError || videosQuery.isError}
                  onClick={onCoverClick}
                />
              )
            }}
          </Cover>
        }
        renderDetails={
          <Info
            createdBy={tvShowQuery.data?.created_by}
            originalLanguage={tvShowQuery.data?.original_language}
            languages={tvShowQuery.data?.spoken_languages}
            status={tvShowQuery.data?.status}
            isLoading={tvShowQuery.isFetching || tvShowQuery.isLoading}
          />
        }
        tagline={tvShowQuery.data?.tagline}
        overview={tvShowQuery.data?.overview}
        isLoading={tvShowQuery.isFetching || tvShowQuery.isLoading}
      />

      <Cast
        cast={creditsQuery.data?.cast}
        name={tvShowQuery.data?.name}
        isError={creditsQuery.isError}
        isSuccess={creditsQuery.isSuccess}
        isLoading={creditsQuery.isFetching || creditsQuery.isLoading}
        onChangeTab={() => onChangeTab(1)}
      />

      <Media
        title={tvShowQuery.data?.name}
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

      <Recommendations
        recommendations={recommendationsQuery.data}
        name={tvShowQuery.data?.name}
        isError={recommendationsQuery.isError}
        isSuccess={recommendationsQuery.isSuccess}
        isLoading={recommendationsQuery.isFetching || recommendationsQuery.isLoading}
      />
    </VStack>
  );
};

export default HomeTab;
