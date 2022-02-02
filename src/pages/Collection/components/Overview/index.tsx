import React, { ReactElement, useState } from 'react';

import { useDisclosure, VStack } from '@chakra-ui/react';

import MediaViewer from '../../../../components/MediaViewer';
import { MediaViewerProps, MediaViewerType } from '../../../../components/MediaViewer/types';
import Paragraphs from '../../../../components/Paragraphs';
import Photos from './components/Photos';
import { OverviewTabProps } from './types';

const OverviewTab = ({ collectionQuery, imagesQuery }: OverviewTabProps): ReactElement => {
  const { isOpen: isMediaViewerOpen, onOpen: onMediaViewerOpen, onClose: onMediaViewerClose } = useDisclosure();

  const [selectedAsset, setSelectedAsset] = useState<MediaViewerProps['selected']>();

  const handleImageClick = (asset: string, type: MediaViewerType): void => {
    setSelectedAsset({ type, asset: asset });
    onMediaViewerOpen();
  };

  return (
    <>
      <VStack width='100%' spacing={2}>
        {collectionQuery.data?.overview || collectionQuery.isFetching || collectionQuery.isLoading ? (
          <Paragraphs
            paragraphs={collectionQuery.data?.overview || ''}
            isLoading={collectionQuery.isFetching || collectionQuery.isLoading}
          />
        ) : null}

        <Photos
          data={{
            photos: imagesQuery.data?.posters || [],
            backdrops: imagesQuery.data?.backdrops || []
          }}
          isError={imagesQuery.isError}
          isSuccess={imagesQuery.isSuccess}
          isLoading={imagesQuery.isFetching || imagesQuery.isLoading}
          onClickImage={handleImageClick}
        />
      </VStack>

      {imagesQuery.isSuccess ? (
        <MediaViewer
          isOpen={isMediaViewerOpen}
          selected={{
            type: selectedAsset?.type,
            asset: selectedAsset?.asset || ''
          }}
          photos={[...(imagesQuery.data?.posters || [])]}
          backdrops={[...(imagesQuery.data?.backdrops || [])]}
          onClose={onMediaViewerClose}
        />
      ) : null}
    </>
  );
};

export default OverviewTab;
