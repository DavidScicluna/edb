import React, { ReactElement } from 'react';

import { VStack } from '@chakra-ui/react';
import _ from 'lodash';

import Media from '../../../../components/Media';
import Bio from './components/Bio';
import KnownFor from './components/KnownFor';
import { OverviewTabProps } from './types';

const OverviewTab = (props: OverviewTabProps): ReactElement => {
  const { person, credits, images, taggedImages, isLoading, isError, isSuccess, onClickImage, onChangeTab } = props;

  return (
    <VStack width='100%' spacing={4}>
      {person?.biography || isLoading ? (
        <Bio
          birthday={person?.birthday}
          place_of_birth={person?.place_of_birth}
          deathday={person?.deathday}
          biography={person?.biography}
          isLoading={isLoading?.person}
        />
      ) : null}

      <KnownFor
        credits={credits}
        name={person?.name}
        isError={isError?.credits}
        isSuccess={isSuccess?.credits}
        isLoading={isLoading?.credits}
        onChangeTab={onChangeTab}
      />

      <Media
        alt={person?.name}
        assets={_.compact([
          {
            label: 'Photos',
            type: 'poster',
            data: images || []
          },
          {
            label: 'Tagged Photos',
            type: 'poster',
            data: taggedImages || []
          }
        ])}
        mediaType='person'
        isError={{
          images: isError?.images || isError?.taggedImages
        }}
        isSuccess={{
          images: isSuccess?.images || isSuccess?.taggedImages
        }}
        isLoading={{
          images: isLoading?.images || isLoading?.taggedImages
        }}
        onAssetClick={(path: string) => onClickImage(path)}
        onFooterClick={() => onChangeTab(2)}
      />
    </VStack>
  );
};

export default OverviewTab;
