import React, { ReactElement, useState } from 'react';

import { useMediaQuery, VStack, ScaleFade } from '@chakra-ui/react';
import _ from 'lodash';

import LoadMore from '../../../../../../components/Clickable/LoadMore';
import Empty from '../../../../../../components/Empty';
import Error from '../../../../../../components/Error';
import VerticalGrid from '../../../../../../components/Grid/Vertical';
import Photo from './components/Photo';
import { PhotosTabProps } from './types';

const incrementBy = 20;

const PhotosTab = (props: PhotosTabProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const { name, images = [], isLoading = true, isError = false, isSuccess = false, onClickImage } = props;

  const [totalVisible, setTotalVisible] = useState<number>(incrementBy);

  return (
    <VStack width='100%' spacing={4}>
      {!isLoading && isError ? (
        <Error
          label='Oh no! Something went wrong'
          description={`Failed to fetch ${name ? `"${name}"` : ''} photos list!`}
          variant='outlined'
        />
      ) : !isLoading && isSuccess && images && images.length === 0 ? (
        <Empty label={`${name ? `"${name}" photos` : 'Photos'} list is currently empty!`} variant='outlined' />
      ) : !isLoading && isSuccess && images && images.length > 0 ? (
        <VerticalGrid displayMode='grid'>
          {() =>
            images
              .filter((_image, index) => index < totalVisible)
              .map((image, index: number) => (
                <Photo
                  key={index}
                  name={name}
                  file_path={image.file_path}
                  isLoading={false}
                  onClickImage={onClickImage}
                />
              ))
          }
        </VerticalGrid>
      ) : (
        <VerticalGrid displayMode='grid'>
          {() =>
            _.range(0, isSuccess && images && images.length > 0 ? images.length : 20).map((_dummy, index: number) => (
              <Photo key={index} isLoading />
            ))
          }
        </VerticalGrid>
      )}

      <ScaleFade
        in={images.length > 0 && images.length > incrementBy}
        unmountOnExit
        style={{ width: isSm ? '100%' : 'auto' }}
      >
        <LoadMore
          amount={totalVisible}
          total={images.length}
          label={name ? `"${name}" photos` : 'Photos'}
          onClick={() => setTotalVisible(totalVisible + incrementBy)}
        />
      </ScaleFade>
    </VStack>
  );
};

export default PhotosTab;
