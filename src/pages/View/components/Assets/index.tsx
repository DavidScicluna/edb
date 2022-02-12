import React, { ReactElement } from 'react';

import { VStack } from '@chakra-ui/react';
import _ from 'lodash';

import Backdrops from './components/Backdrops';
import Posters from './components/Posters';
import Profiles from './components/Profiles';
import Videos from './components/Videos';
import { AssetsTabProps } from './types';

const Assets = (props: AssetsTabProps): ReactElement => {
  const { alt, images, videos, isError, isSuccess, isLoading, onClickAsset } = props;

  return (
    <VStack width='100%' spacing={4}>
      {images?.profiles ? (
        <Profiles
          alt={alt}
          profiles={images.profiles}
          isError={isError.images}
          isSuccess={isSuccess.images}
          isLoading={isLoading.images}
          isOnlyAsset={
            (_.isNil(images.posters) || _.isEmpty(images.posters)) &&
            (_.isNil(images.backdrops) || _.isEmpty(images.backdrops)) &&
            (_.isNil(videos) || _.isEmpty(videos))
          }
          onClickImage={(path) => onClickAsset(path, 'image')}
        />
      ) : null}

      {images?.posters ? (
        <Posters
          alt={alt}
          posters={images.posters}
          isError={isError.images}
          isSuccess={isSuccess.images}
          isLoading={isLoading.images}
          isOnlyAsset={
            (_.isNil(images.profiles) || _.isEmpty(images.profiles)) &&
            (_.isNil(images.backdrops) || _.isEmpty(images.backdrops)) &&
            (_.isNil(videos) || _.isEmpty(videos))
          }
          onClickImage={(path) => onClickAsset(path, 'image')}
        />
      ) : null}

      {images?.backdrops ? (
        <Backdrops
          alt={alt}
          backdrops={images.backdrops}
          isError={isError.images}
          isSuccess={isSuccess.images}
          isLoading={isLoading.images}
          isOnlyAsset={
            (_.isNil(images.profiles) || _.isEmpty(images.profiles)) &&
            (_.isNil(images.posters) || _.isEmpty(images.posters)) &&
            (_.isNil(videos) || _.isEmpty(videos))
          }
          onClickImage={(path) => onClickAsset(path, 'image')}
        />
      ) : null}

      {videos ? (
        <Videos
          alt={alt}
          videos={videos}
          isError={isError.videos}
          isSuccess={isSuccess.videos}
          isLoading={isLoading.videos}
          isOnlyAsset={
            (_.isNil(images?.profiles) || _.isEmpty(images?.profiles)) &&
            (_.isNil(images?.posters) || _.isEmpty(images?.posters)) &&
            (_.isNil(images?.backdrops) || _.isEmpty(images?.backdrops))
          }
          onClickVideo={(videoId) => onClickAsset(videoId, 'video')}
        />
      ) : null}
    </VStack>
  );
};

export default Assets;
