import React, { ReactElement } from 'react';

import { useMediaQuery } from '@chakra-ui/react';
import _ from 'lodash';

import { useSelector } from '../../../../common/hooks';
import { Profile } from '../../../../common/types/person';
import utils from '../../../../common/utils/utils';
import Button from '../../../../components/Clickable/Button';
import ClickableImage from '../../../../components/Clickable/Image';
import Empty from '../../../../components/Empty';
import Error from '../../../../components/Error';
import HorizontalGrid from '../../../../components/Grid/Horizontal';
import Image from '../../../../components/Image';
import Skeleton from '../../../../components/Skeleton';
import { PhotosProps } from './types';

const width = ['185px', '205px', '230px'];

const Photos = (props: PhotosProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const { images, name, isError = false, isSuccess = false, isLoading = false, onClickImage } = props;

  const color = useSelector((state) => state.user.ui.theme.color);

  return (
    <HorizontalGrid
      title='Photos'
      footer={
        images.length > 7 ? (
          <Button
            color={utils.handleReturnColor(color)}
            isFullWidth
            isDisabled={isLoading || isError}
            onClick={() => onClickImage()}
            size={isSm ? 'sm' : 'md'}
            variant='text'>
            {`View all ${name ? `"${name}"` : ''} photos`}
          </Button>
        ) : undefined
      }
      isLoading={isLoading}
      hasDivider
      variant='outlined'>
      {isError ? (
        <Error
          label='Oh no! Something went wrong'
          description={`Failed to fetch ${name ? `"${name}"` : ''} photos!`}
          variant='transparent'
        />
      ) : isSuccess && images && images.length === 0 ? (
        <Empty label={`${name ? `"${name}"` : ''} has no photos`} variant='transparent' />
      ) : (
        <>
          {[...(images && images.length > 0 ? images : _.range(0, 8))]
            .filter((_image, index) => index < 8)
            .map((image: Profile | number, index) => (
              <ClickableImage
                key={index}
                width={width}
                borderRadius='base'
                ratio={2 / 3}
                isDisabled={isLoading}
                onClick={typeof image !== 'number' && image ? () => onClickImage(image) : undefined}>
                <Skeleton isLoaded={!isLoading} borderRadius='base'>
                  <Image
                    alt={`${name ? `"${name}"` : ''} image`}
                    maxWidth='none'
                    height='100%'
                    borderRadius='base'
                    mediaType='person'
                    src={typeof image !== 'number' && image ? image?.file_path : ''}
                    size={{
                      thumbnail: 'w45',
                      full: 'original'
                    }}
                  />
                </Skeleton>
              </ClickableImage>
            ))}
        </>
      )}
    </HorizontalGrid>
  );
};

export default Photos;
