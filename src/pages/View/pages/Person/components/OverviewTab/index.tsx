import React, { ReactElement } from 'react';

import { VStack } from '@chakra-ui/react';
import _ from 'lodash';

import Media from '../../../../components/Media';
import Bio from './components/Bio';
import KnownFor from './components/KnownFor';
import { OverviewTabProps } from './types';

const OverviewTab = (props: OverviewTabProps): ReactElement => {
  const { person, credits, images, isLoading, isError, isSuccess, onClickImage, onChangeTab } = props;

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
            isDisabled: images?.length === 0,
            data: images || []
          }
        ])}
        mediaType='person'
        isError={{
          images: isError?.images
        }}
        isSuccess={{
          images: isSuccess?.images
        }}
        isLoading={{
          images: isLoading?.images
        }}
        onAssetClick={(path: string) => onClickImage(path)}
        onFooterClick={() => onChangeTab(2)}
      />
    </VStack>
  );
};

export default OverviewTab;
