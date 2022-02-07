import React, { ReactElement, useState } from 'react';

import { useMediaQuery, VStack, ScaleFade } from '@chakra-ui/react';
import _ from 'lodash';
import CountUp from 'react-countup';

import { Image } from '../../../../../../../../common/types';
import Badge from '../../../../../../../../components/Badge';
import LoadMore from '../../../../../../../../components/Clickable/LoadMore';
import Empty from '../../../../../../../../components/Empty';
import Error from '../../../../../../../../components/Error';
import VerticalGrid from '../../../../../../../../components/Grid/Vertical';
import Panel from '../../../../../../../../components/Panel';
import Photo from '../Photo';
import { TaggedPhotosProps } from './types';

const incrementBy = 20;

const TaggedPhotos = (props: TaggedPhotosProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const { name, taggedImages = [], isLoading = true, isError = false, isSuccess = false, onClickImage } = props;

  const [totalVisible, setTotalVisible] = useState<number>(incrementBy);

  return (
    <Panel isFullWidth variant='transparent'>
      {{
        header: {
          title: 'Tagged Photos',
          actions: (
            <Badge size='lg'>
              <CountUp duration={1} end={taggedImages?.length || 0} />
            </Badge>
          )
        },
        body: (
          <VStack width='100%' spacing={4}>
            {!isLoading && isError ? (
              <Error
                label='Oh no! Something went wrong'
                description={`Failed to fetch ${name ? `"${name}"` : ''} tagged photos list!`}
                variant='outlined'
              />
            ) : !isLoading && isSuccess && taggedImages && taggedImages.length === 0 ? (
              <Empty
                label={`${name ? `"${name}" tagged photos` : 'Tagged photos'} list is currently empty!`}
                variant='outlined'
              />
            ) : !isLoading && isSuccess && taggedImages && taggedImages.length > 0 ? (
              <VerticalGrid displayMode='grid'>
                {() =>
                  taggedImages
                    .filter((_image, index) => index < totalVisible)
                    .map((image: Image, index: number) => (
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
                  _.range(0, isSuccess && taggedImages && taggedImages.length > 0 ? taggedImages.length : 20).map(
                    (_dummy, index: number) => <Photo key={index} isLoading />
                  )
                }
              </VerticalGrid>
            )}

            <ScaleFade
              in={taggedImages.length > 0 && taggedImages.length > incrementBy}
              unmountOnExit
              style={{ width: isSm ? '100%' : 'auto' }}
            >
              <LoadMore
                amount={totalVisible}
                total={taggedImages.length}
                label={name ? `"${name}" tagged photos` : 'Tagged photos'}
                onClick={() => setTotalVisible(totalVisible + incrementBy)}
              />
            </ScaleFade>
          </VStack>
        )
      }}
    </Panel>
  );
};

export default TaggedPhotos;
