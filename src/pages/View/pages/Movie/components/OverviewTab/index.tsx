import React, { ReactElement } from 'react';

import { VStack, Collapse } from '@chakra-ui/react';
import _ from 'lodash';

import Hero from '../../../../components/Hero';
import Backdrop from '../../../../components/Hero/components/Cover/components/Backdrop';
import Poster from '../../../../components/Hero/components/Cover/components/Poster';
import Media from '../../../../components/Media';
import Cast from './components/Cast';
import Collection from './components/Collection';
import Credits from './components/Credits';
import Details from './components/Details';
import Recommendations from './components/Recommendations';
import Similar from './components/Similar';
import { OverviewTabProps } from './types';

const OverviewTab = (props: OverviewTabProps): ReactElement => {
  const {
    movieQuery,
    creditsQuery,
    collectionQuery,
    recommendationsQuery,
    similarQuery,
    imagesQuery,
    videosQuery,
    onAssetClick,
    onChangeTab
  } = props;

  return (
    <VStack width='100%' maxWidth='100%' spacing={4}>
      <Hero
        renderPoster={() => (
          <Poster
            alt={movieQuery.data?.title}
            path={movieQuery.data?.poster_path}
            mediaType='movie'
            isLoading={movieQuery.isFetching || movieQuery.isLoading}
            isError={movieQuery.isError}
            onClick={(path: string) => onAssetClick(path, 'image')}
          />
        )}
        renderBackdrop={() => (
          <Backdrop
            alt={movieQuery.data?.title}
            path={movieQuery.data?.backdrop_path}
            video={movieQuery.data?.video || (videosQuery.data?.results?.length || 0) > 0}
            mediaType='movie'
            isLoading={movieQuery.isFetching || movieQuery.isLoading}
            isError={movieQuery.isError}
            onClick={(path: string, video: boolean) => onAssetClick(path, video ? 'video' : 'image')}
          />
        )}
        renderDetails={() => (
          <>
            <Details movie={movieQuery.data} isLoading={movieQuery.isFetching || movieQuery.isLoading} />

            {(!_.isNil(creditsQuery.data?.crew) && !_.isEmpty(creditsQuery.data?.crew)) ||
            movieQuery.isFetching ||
            movieQuery.isLoading ? (
              <Credits crew={creditsQuery.data?.crew} isLoading={creditsQuery.isFetching || creditsQuery.isLoading} />
            ) : null}
          </>
        )}
        tagline={movieQuery.data?.tagline}
        overview={movieQuery.data?.overview}
        isLoading={movieQuery.isFetching || movieQuery.isLoading}
      />

      <Cast
        title={movieQuery.data?.title}
        cast={creditsQuery.data?.cast}
        isError={creditsQuery.isError}
        isSuccess={creditsQuery.isSuccess}
        isLoading={creditsQuery.isFetching || creditsQuery.isLoading}
        onChangeTab={() => onChangeTab(1)}
      />

      <Collapse
        in={collectionQuery.isSuccess && !_.isNil(collectionQuery.data) && !_.isEmpty(collectionQuery.data)}
        unmountOnExit
        style={{ width: '100%' }}
      >
        <Collection collection={collectionQuery.data} />
      </Collapse>

      <Recommendations
        recommendations={recommendationsQuery.data}
        title={movieQuery.data?.title}
        isError={recommendationsQuery.isError}
        isSuccess={recommendationsQuery.isSuccess}
        isLoading={recommendationsQuery.isFetching || recommendationsQuery.isLoading}
      />

      <Similar
        similar={similarQuery.data}
        title={movieQuery.data?.title}
        isError={similarQuery.isError}
        isSuccess={similarQuery.isSuccess}
        isLoading={similarQuery.isFetching || similarQuery.isLoading}
      />

      <Media
        alt={movieQuery.data?.title}
        assets={_.compact([
          !_.isNil(imagesQuery.data?.posters) || !_.isEmpty(imagesQuery.data?.posters)
            ? {
                label: 'Posters',
                type: 'poster',
                isDisabled: imagesQuery.data?.posters?.length === 0,
                data: imagesQuery.data?.posters || []
              }
            : undefined,
          !_.isNil(imagesQuery.data?.backdrops) || !_.isEmpty(imagesQuery.data?.backdrops)
            ? {
                label: 'Backdrops',
                type: 'backdrop',
                isDisabled: imagesQuery.data?.backdrops?.length === 0,
                data: imagesQuery.data?.backdrops || []
              }
            : undefined,
          !_.isNil(videosQuery.data?.results) || !_.isEmpty(videosQuery.data?.results)
            ? {
                label: 'Videos',
                type: 'video',
                isDisabled: videosQuery.data?.results?.length === 0,
                data: videosQuery.data?.results || []
              }
            : undefined
        ])}
        mediaType='movie'
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
        onAssetClick={onAssetClick}
        onFooterClick={() => onChangeTab(3)}
      />
    </VStack>
  );
};

export default OverviewTab;
