import { ReactElement } from 'react';

import { useMediaQuery } from '@chakra-ui/react';
import _ from 'lodash';

import { useSelector } from '../../../../../../../../common/hooks';
import { Image as ImageType } from '../../../../../../../../common/types';
import Button from '../../../../../../../../components/Clickable/Button';
import Empty from '../../../../../../../../components/Empty';
import Error from '../../../../../../../../components/Error';
import HorizontalGrid from '../../../../../../../../components/Grid/Horizontal/Default';
import Photo from './components/Photo';
import { PhotosProps } from './types';

const Photos = (props: PhotosProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const { images, name, isLoading = true, isError = false, isSuccess = false, onClickImage, onChangeTab } = props;

  const color = useSelector((state) => state.user.ui.theme.color);

  return (
    <HorizontalGrid
      title='Photos'
      footer={
        <Button
          color={color}
          isFullWidth
          isDisabled={isLoading || isError}
          onClick={() => onChangeTab(2)}
          size={isSm ? 'sm' : 'md'}
          variant='text'
        >
          {`View all ${images?.length || 0} photos ${name && !isSm ? `of "${name}"` : ''}`}
        </Button>
      }
      isDisabled={isLoading}
      variant='outlined'
    >
      {!isLoading && isError ? (
        <Error
          label='Oh no! Something went wrong'
          description={`Failed to fetch ${name ? `"${name}"` : ''} photos!`}
          variant='transparent'
        />
      ) : !isLoading && isSuccess && images && images.length === 0 ? (
        <Empty label={`${name ? `"${name}"` : ''} has no photos`} variant='transparent' />
      ) : !isLoading && isSuccess && images && images.length > 0 ? (
        images
          .filter((_image, index) => index < 10)
          .map((image: ImageType, index: number) => (
            <Photo key={index} name={name} file_path={image.file_path} isLoading={false} onClickImage={onClickImage} />
          ))
      ) : (
        [...(images && images.length > 0 ? images : _.range(0, 8))]
          .filter((_image, index) => index < 10)
          .map((_dummy, index: number) => <Photo key={index} isLoading />)
      )}
    </HorizontalGrid>
  );
};

export default Photos;
