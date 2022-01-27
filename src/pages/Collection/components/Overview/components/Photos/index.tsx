import { ReactElement, useState } from 'react';

import { useMediaQuery } from '@chakra-ui/react';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import _ from 'lodash';

import { useSelector } from '../../../../../../common/hooks';
import { Icon, Image as ImageType } from '../../../../../../common/types';
import Button from '../../../../../../components/Clickable/Button';
import ClickableImage from '../../../../../../components/Clickable/Image';
import { IconProps } from '../../../../../../components/Clickable/Image/types';
import Empty from '../../../../../../components/Empty';
import Error from '../../../../../../components/Error';
import HorizontalTabbedGrid from '../../../../../../components/Grid/Horizontal/Tabbed';
import Image from '../../../../../../components/Image';
import Skeleton from '../../../../../../components/Skeleton';
import { PhotosProps } from './types';

const width = ['185px', '205px', '230px'];

const Photos = (props: PhotosProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const color = useSelector((state) => state.user.ui.theme.color);

  const { data, isLoading = true, isError = false, isSuccess = false, onClickImage } = props;

  const [activeTab, setActiveTab] = useState<number>(0);

  const handleReturnIcon = (props: IconProps): Icon => {
    return <SearchOutlinedIcon style={{ ...props }} />;
  };

  return (
    <HorizontalTabbedGrid
      activeTab={activeTab}
      onChange={(index: number) => setActiveTab(index)}
      footer={
        (activeTab === 0 ? data.photos.length > 10 : activeTab === 1 ? data.backdrops.length > 10 : false) ? (
          <Button color={color} isFullWidth isDisabled={isLoading || isError} size={isSm ? 'sm' : 'md'} variant='text'>
            {`View all ${activeTab === 0 ? data.photos.length : activeTab === 1 ? data.backdrops.length : ''} ${
              activeTab === 0 ? 'Photos' : activeTab === 1 ? 'Backdrops' : ''
            }`}
          </Button>
        ) : undefined
      }
      isDisabled={isLoading || isError}
      renderTabListProps={{
        renderTabs: [
          {
            label: 'Photos', // TODO: Add badge
            isDisabled: isLoading || isError || false
          },
          {
            label: 'Backdrops', // TODO: Add badge
            isDisabled: isLoading || isError || false
          }
        ]
      }}
    >
      <>
        {!isLoading && isError ? (
          <Error label='Oh no! Something went wrong' description='Failed to fetch photos!' variant='transparent' />
        ) : !isLoading && isSuccess && data.photos && data.photos.length === 0 ? (
          <Empty label='Oh no! Something went wrong' description='Photos is currently empty!' variant='transparent' />
        ) : !isLoading && isSuccess && data.photos && data.photos.length > 0 ? (
          data.photos
            .filter((_photo, index) => index < 10)
            .map((photo: ImageType, index: number) => (
              <ClickableImage
                key={index}
                width={width}
                borderRadius='lg'
                renderIcon={handleReturnIcon}
                onClick={() => onClickImage(photo.file_path || '', 'photo')}
              >
                <Image
                  alt={`${activeTab === 0 ? 'Photo' : activeTab === 1 ? 'Backdrop' : ''} image`}
                  maxWidth='none'
                  height='100%'
                  borderRadius='lg'
                  boringType='marble'
                  thumbnailSrc={`${process.env.REACT_APP_IMAGE_URL}/w92${photo.file_path}`}
                  fullSrc={`${process.env.REACT_APP_IMAGE_URL}/original${photo.file_path}`}
                />
              </ClickableImage>
            ))
        ) : (
          _.range(0, 10).map((_dummy, index: number) => (
            <ClickableImage key={index} width={width} borderRadius='lg' renderIcon={handleReturnIcon} isDisabled>
              <Skeleton key={index} isLoaded={!isLoading} borderRadius='lg' />
            </ClickableImage>
          ))
        )}
      </>

      <>
        {!isLoading && isError ? (
          <Error label='Oh no! Something went wrong' description='Failed to fetch backdrops!' variant='transparent' />
        ) : !isLoading && isSuccess && data.backdrops && data.backdrops.length === 0 ? (
          <Empty
            label='Oh no! Something went wrong'
            description='Backdrops is currently empty!'
            variant='transparent'
          />
        ) : !isLoading && isSuccess && data.backdrops && data.backdrops.length > 0 ? (
          data.backdrops
            .filter((_backdrop, index) => index < 10)
            .map((backdrop: ImageType, index: number) => (
              <ClickableImage
                key={index}
                width={width}
                borderRadius='lg'
                renderIcon={handleReturnIcon}
                onClick={() => onClickImage(backdrop.file_path || '', 'backdrop')}
              >
                <Image
                  alt={`${activeTab === 0 ? 'Photo' : activeTab === 1 ? 'Backdrop' : ''} image`}
                  maxWidth='none'
                  height='100%'
                  borderRadius='lg'
                  boringType='marble'
                  thumbnailSrc={`${process.env.REACT_APP_IMAGE_URL}/w300${backdrop.file_path}`}
                  fullSrc={`${process.env.REACT_APP_IMAGE_URL}/original${backdrop.file_path}`}
                />
              </ClickableImage>
            ))
        ) : (
          _.range(0, 10).map((_dummy, index: number) => (
            <ClickableImage key={index} width={width} borderRadius='lg' renderIcon={handleReturnIcon} isDisabled>
              <Skeleton key={index} isLoaded={!isLoading} borderRadius='lg' />
            </ClickableImage>
          ))
        )}
      </>
    </HorizontalTabbedGrid>
  );
};

export default Photos;
