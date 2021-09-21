import React, { ReactElement } from 'react';

import { HStack } from '@chakra-ui/react';
import _ from 'lodash';

import { ImageResponse as ImageType } from '../../../../../../../../common/types/types';
import ClickableImage from '../../../../../../../../components/Clickable/Image';
import Empty from '../../../../../../../../components/Empty';
import Error from '../../../../../../../../components/Error';
import Image from '../../../../../../../../components/Image';
import Skeleton from '../../../../../../../../components/Skeleton';
import { BackdropsProps } from './types';

const width = ['185px', '205px', '230px'];

const Backdrops = (props: BackdropsProps): ReactElement => {
  const { name, backdrops, isError = false, isSuccess = false, isLoading = false, onClick } = props;

  return (
    <HStack spacing={2}>
      {isError ? (
        <Error
          label='Oh no! Something went wrong'
          description={`Failed to fetch ${name ? `"${name}"` : ''} backdrops!`}
          variant='transparent'
        />
      ) : isSuccess && backdrops && backdrops.length === 0 ? (
        <Empty label={`${name ? `"${name}"` : ''} has no backdrops`} variant='transparent' />
      ) : (
        <>
          {[...(backdrops && backdrops.length > 0 ? backdrops : _.range(0, 8))]
            .filter((_image, index) => index < 8)
            .map((image: ImageType | number, index) => (
              <ClickableImage
                key={index}
                width={width}
                borderRadius='base'
                ratio={2 / 3}
                isDisabled={isLoading}
                onClick={typeof image !== 'number' && image ? () => onClick(image.file_path, 'backdrop') : undefined}>
                <Skeleton isLoaded={!isLoading} borderRadius='base'>
                  <Image
                    alt={`${name ? `"${name}"` : ''} image`}
                    maxWidth='none'
                    height='100%'
                    borderRadius='base'
                    mediaType='movie'
                    src={typeof image !== 'number' && image ? image?.file_path : ''}
                    size={{
                      thumbnail: 'w300',
                      full: 'original'
                    }}
                  />
                </Skeleton>
              </ClickableImage>
            ))}
        </>
      )}
    </HStack>
  );
};

export default Backdrops;
