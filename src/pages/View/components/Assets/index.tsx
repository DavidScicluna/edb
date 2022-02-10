import React, { ReactElement } from 'react';

import { VStack } from '@chakra-ui/react';
import _ from 'lodash';

import Backdrops from './components/Backdrops';
import Posters from './components/Posters';
import Profiles from './components/Profiles';
import { AssetsTabProps } from './types';

const Assets = (props: AssetsTabProps): ReactElement => {
  const { alt, images, isError, isSuccess, isLoading, onClickImage } = props;

  console.log(
    (_.isNil(images.posters) || _.isEmpty(images.posters)) && (_.isNil(images.backdrops) || _.isEmpty(images.backdrops))
  );

  return (
    <VStack width='100%' spacing={4}>
      {images.profiles ? (
        <Profiles
          alt={alt}
          profiles={images.profiles}
          isError={isError.images}
          isSuccess={isSuccess.images}
          isLoading={isLoading.images}
          isOnlyAsset={
            (_.isNil(images.posters) || _.isEmpty(images.posters)) &&
            (_.isNil(images.backdrops) || _.isEmpty(images.backdrops))
          }
          onClickImage={(path: string) => onClickImage(path, 'image')}
        />
      ) : null}

      {images.posters ? (
        <Posters
          alt={alt}
          posters={images.posters}
          isError={isError.images}
          isSuccess={isSuccess.images}
          isLoading={isLoading.images}
          isOnlyAsset={
            (_.isNil(images.profiles) || _.isEmpty(images.profiles)) &&
            (_.isNil(images.backdrops) || _.isEmpty(images.backdrops))
          }
          onClickImage={(path: string) => onClickImage(path, 'image')}
        />
      ) : null}

      {images.backdrops ? (
        <Backdrops
          alt={alt}
          backdrops={images.backdrops}
          isError={isError.images}
          isSuccess={isSuccess.images}
          isLoading={isLoading.images}
          isOnlyAsset={
            (_.isNil(images.profiles) || _.isEmpty(images.profiles)) &&
            (_.isNil(images.posters) || _.isEmpty(images.posters))
          }
          onClickImage={(path: string) => onClickImage(path, 'image')}
        />
      ) : null}
    </VStack>
  );
};

export default Assets;
