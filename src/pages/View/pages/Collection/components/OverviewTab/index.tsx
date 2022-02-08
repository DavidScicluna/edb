import React, { ReactElement } from 'react';

import { VStack } from '@chakra-ui/react';
import _ from 'lodash';

import Paragraphs from '../../../../../../components/Paragraphs';
import Media from '../../../../components/Media';
import { OverviewTabProps } from './types';

const OverviewTab = ({ collectionQuery, imagesQuery, onClickImage, onChangeTab }: OverviewTabProps): ReactElement => {
  return (
    <VStack width='100%' spacing={4}>
      {collectionQuery.data?.overview || collectionQuery.isFetching || collectionQuery.isLoading ? (
        <Paragraphs
          paragraphs={collectionQuery.data?.overview || ''}
          isLoading={collectionQuery.isFetching || collectionQuery.isLoading}
        />
      ) : null}

      <Media
        alt={collectionQuery.data?.name}
        assets={_.compact([
          {
            label: 'Posters',
            type: 'poster',
            data: imagesQuery.data?.posters || []
          },
          {
            label: 'Backdrops',
            type: 'backdrop',
            data: imagesQuery.data?.backdrops || []
          }
        ])}
        mediaType='collection'
        isError={{
          images: imagesQuery.isError
        }}
        isSuccess={{
          images: imagesQuery.isSuccess
        }}
        isLoading={{
          images: imagesQuery.isFetching || imagesQuery.isLoading
        }}
        onAssetClick={(path: string) => onClickImage(path)}
        onFooterClick={() => onChangeTab(2)}
      />
    </VStack>
  );
};

export default OverviewTab;
