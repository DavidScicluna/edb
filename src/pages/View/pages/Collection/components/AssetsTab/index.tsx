import React, { ReactElement } from 'react';

import { VStack } from '@chakra-ui/react';

import Backdrops from './components/Backdrops';
import Posters from './components/Posters';
import { AssetsTabProps } from './types';

const AssetsTab = (props: AssetsTabProps): ReactElement => {
  const { images, ...rest } = props;

  return (
    <VStack width='100%' spacing={4}>
      <Posters {...rest} posters={images.posters} />

      <Backdrops {...rest} backdrops={images.backdrops} />
    </VStack>
  );
};

export default AssetsTab;
