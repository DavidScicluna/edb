import React, { ReactElement } from 'react';

import { VStack } from '@chakra-ui/react';

import Bio from './components/Bio';
import KnownFor from './components/KnownFor';
import Photos from './components/Photos';
import { OverviewProps } from './types';

const Overview = (props: OverviewProps): ReactElement => {
  const { images, credits, person, isLoading, isError, isSuccess, onClickImage, onChangeTab } = props;

  return (
    <VStack width='100%' spacing={4}>
      {person?.biography || isLoading ? (
        <Bio biography={person?.biography || ''} isLoading={isLoading?.person} />
      ) : null}

      <KnownFor
        credits={credits}
        name={person?.name}
        isError={isError?.credits}
        isSuccess={isSuccess?.credits}
        isLoading={isLoading?.credits}
        onChangeTab={onChangeTab}
      />

      <Photos
        images={images}
        name={person?.name}
        isError={isError?.images}
        isSuccess={isSuccess?.images}
        isLoading={isLoading?.images}
        onClickImage={onClickImage}
        onChangeTab={onChangeTab}
      />
    </VStack>
  );
};

export default Overview;
