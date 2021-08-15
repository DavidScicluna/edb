import React, { ReactElement } from 'react';

import { useColorMode, useMediaQuery, Text } from '@chakra-ui/react';

import useSelector from '../../../../common/hooks/useSelectorTyped';
import { Image as ImageType } from '../../../../common/types/person';
import utils from '../../../../common/utils/utils';
import Button from '../../../../components/Clickable/Button';
import Empty from '../../../../components/Empty';
import Error from '../../../../components/Error';
import HorizontalGrid from '../../../../components/Grid/Horizontal';
import Image from './components/Image';
import { PhotosProps } from './types';

const Photos = (props: PhotosProps): ReactElement => {
  const { colorMode } = useColorMode();
  const [isSm] = useMediaQuery('(max-width: 480px)');

  const { images, name, isError = false, isSuccess = false, isLoading = false, onClickImage } = props;

  const color = useSelector((state) => state.user.ui.theme.color);

  return (
    <HorizontalGrid
      title={
        <Text
          width='100%'
          align='left'
          color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
          fontSize='md'
          fontWeight='medium'>
          Photos
        </Text>
      }
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
          {[...(images && images.length > 0 ? images : Array(5))]
            .filter((_image, index) => index < 8)
            .map((image: ImageType | number, index) => (
              <Image
                key={index}
                image={typeof image !== 'number' && image ? image : undefined}
                name={name}
                isLoading={isLoading}
                onClickImage={onClickImage}
              />
            ))}
        </>
      )}
    </HorizontalGrid>
  );
};

export default Photos;
