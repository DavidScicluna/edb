import React, { ReactElement, useState } from 'react';

import { VStack } from '@chakra-ui/react';
import _ from 'lodash';

import Backdrops from './components/Backdrops';
import Posters from './components/Posters';
import Profiles from './components/Profiles';
import QuickToggles from './components/QuickToggles';
import Videos from './components/Videos';
import { AssetsTabProps } from './types';

const Assets = (props: AssetsTabProps): ReactElement => {
  const [openedPanels, setOpenedPanels] = useState<number[]>([]);

  const { alt, images, videos, isError, isSuccess, isLoading, onClickAsset } = props;

  const [assets] = useState<string[]>(
    _.compact([
      (!_.isNil(images?.profiles) && !_.isEmpty(images?.profiles)) || isLoading.images ? 'photos' : undefined,
      (!_.isNil(images?.posters) && !_.isEmpty(images?.posters)) || isLoading.images ? 'posters' : undefined,
      (!_.isNil(images?.backdrops) && !_.isEmpty(images?.backdrops)) || isLoading.images ? 'backdrops' : undefined,
      (!_.isNil(videos) && !_.isEmpty(videos)) || isLoading.videos ? 'videos' : undefined
    ])
  );

  const handleTogglePanel = (index: number): void => {
    if (openedPanels.includes(index)) {
      setOpenedPanels(openedPanels.filter((number) => number !== index));
    } else {
      setOpenedPanels([...openedPanels, index]);
    }
  };

  const handleToggleAllPanels = (): void => {
    if (assets.length === openedPanels.length) {
      setOpenedPanels([]);
    } else {
      setOpenedPanels(assets.map((_department, index) => index));
    }
  };

  return (
    <VStack width='100%' spacing={2}>
      <QuickToggles
        assets={assets}
        openedPanels={openedPanels.length}
        isLoading={isLoading.images || isLoading.videos || false}
        onTogglePanel={(index: number) => setOpenedPanels([...openedPanels, index])}
        onToggleAllPanels={handleToggleAllPanels}
      />

      <VStack width='100%' spacing={2}>
        {_.compact([
          (!_.isNil(images?.profiles) && !_.isEmpty(images?.profiles)) || isLoading.images ? (
            <Profiles
              alt={alt}
              profiles={images?.profiles || []}
              isOpen={openedPanels.includes(assets.findIndex((asset) => asset === 'photos'))}
              isError={isError.images}
              isSuccess={isSuccess.images}
              isLoading={isLoading.images}
              onClickImage={(path) => onClickAsset(path, 'image')}
              onToggle={() => handleTogglePanel(assets.findIndex((asset) => asset === 'photos'))}
            />
          ) : undefined,
          (!_.isNil(images?.posters) && !_.isEmpty(images?.posters)) || isLoading.images ? (
            <Posters
              alt={alt}
              posters={images?.posters || []}
              isOpen={openedPanels.includes(assets.findIndex((asset) => asset === 'posters'))}
              isError={isError.images}
              isSuccess={isSuccess.images}
              isLoading={isLoading.images}
              onClickImage={(path) => onClickAsset(path, 'image')}
              onToggle={() => handleTogglePanel(assets.findIndex((asset) => asset === 'posters'))}
            />
          ) : undefined,
          (!_.isNil(images?.backdrops) && !_.isEmpty(images?.backdrops)) || isLoading.images ? (
            <Backdrops
              alt={alt}
              backdrops={images?.backdrops || []}
              isOpen={openedPanels.includes(assets.findIndex((asset) => asset === 'backdrops'))}
              isError={isError.images}
              isSuccess={isSuccess.images}
              isLoading={isLoading.images}
              onClickImage={(path) => onClickAsset(path, 'image')}
              onToggle={() => handleTogglePanel(assets.findIndex((asset) => asset === 'backdrops'))}
            />
          ) : undefined,
          (!_.isNil(videos) && !_.isEmpty(videos)) || isLoading.videos ? (
            <Videos
              alt={alt}
              videos={videos || []}
              isOpen={openedPanels.includes(assets.findIndex((asset) => asset === 'videos'))}
              isError={isError.videos}
              isSuccess={isSuccess.videos}
              isLoading={isLoading.videos}
              onClickVideo={(videoId) => onClickAsset(videoId, 'video')}
              onToggle={() => handleTogglePanel(assets.findIndex((asset) => asset === 'videos'))}
            />
          ) : undefined
        ])}
      </VStack>
    </VStack>
  );
};

export default Assets;
