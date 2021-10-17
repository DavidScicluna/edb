import { ReactElement } from 'react';

import { useColorMode, useMediaQuery, Center, Text } from '@chakra-ui/react';
import _ from 'lodash';

import { useSelector } from '../../../../../common/hooks';
import { Profile } from '../../../../../common/types/person';
import { handleReturnColor } from '../../../../../common/utils';
import Badge from '../../../../../components/Badge';
import Button from '../../../../../components/Clickable/Button';
import ClickableImage from '../../../../../components/Clickable/Image';
import Empty from '../../../../../components/Empty';
import Error from '../../../../../components/Error';
import HorizontalGrid from '../../../../../components/Grid/Horizontal';
import Image from '../../../../../components/Image';
import Skeleton from '../../../../../components/Skeleton';
import { PhotosProps } from './types';

const width = ['185px', '205px', '230px'];

const Photos = (props: PhotosProps): ReactElement => {
  const { colorMode } = useColorMode();
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const { images, name, isError = false, isSuccess = false, isLoading = false, onClickImage } = props;

  const color = useSelector((state) => state.user.ui.theme.color);

  return (
    <HorizontalGrid
      title={
        <Center>
          <Text
            align='left'
            color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
            fontSize='lg'
            fontWeight='semibold'>
            Photos
          </Text>
          <Badge label={String(images.length)} size='md' ml={2} />
        </Center>
      }
      footer={
        images.length > 7 ? (
          <Button
            color={handleReturnColor(color)}
            isFullWidth
            isDisabled={isLoading || isError}
            onClick={() => onClickImage(images[0].file_path)}
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
                borderRadius='lg'
                isDisabled={isLoading}
                onClick={typeof image !== 'number' && image ? () => onClickImage(image.file_path) : undefined}>
                <Skeleton isLoaded={!isLoading} borderRadius='lg'>
                  <Image
                    alt={`${name ? `"${name}"` : ''} image`}
                    maxWidth='none'
                    height='100%'
                    borderRadius='lg'
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
