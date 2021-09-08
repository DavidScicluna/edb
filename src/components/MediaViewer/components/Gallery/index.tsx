import React, { ReactElement } from 'react';

import { VStack, SlideFade } from '@chakra-ui/react';

import Modal from '../../../Modal';
import Grid from './components/Grid';
import Photo from './components/Photo';
import Video from './components/Video';
import { GalleryProps } from './types';

const Gallery = (props: GalleryProps): ReactElement => {
  const { isOpen, name, activePath, photos, backdrops, videos, mediaType, onClick, onClose } = props;

  return (
    <Modal title='Gallery' isOpen={isOpen} onClose={onClose} isCentered size='full'>
      <VStack width='100%' p={2} spacing={10}>
        {/* Photos Section */}
        <SlideFade in={photos && photos.length > 0} unmountOnExit style={{ width: '100%' }}>
          <Grid title='Photos'>
            <>
              {photos?.map((photo, index) => (
                <Photo
                  key={index}
                  photo={photo}
                  name={name}
                  type='photo'
                  mediaType={mediaType}
                  isActive={photo.file_path === activePath}
                  onClickImage={onClick}
                />
              ))}
            </>
          </Grid>
        </SlideFade>

        {/* Backdrops Section */}
        <SlideFade in={backdrops && backdrops.length > 0} unmountOnExit style={{ width: '100%' }}>
          <Grid title='Backdrops'>
            <>
              {backdrops?.map((backdrop, index) => (
                <Photo
                  key={index}
                  photo={backdrop}
                  name={name}
                  type='backdrop'
                  mediaType={mediaType}
                  isActive={backdrop.file_path === activePath}
                  onClickImage={onClick}
                />
              ))}
            </>
          </Grid>
        </SlideFade>

        {/* Videos Section */}
        <SlideFade in={videos && videos.length > 0} unmountOnExit style={{ width: '100%' }}>
          <Grid title='Videos'>
            <>
              {videos?.map((video, index) => (
                <Video key={index} video={video} isActive={video.key === activePath} onClickVideo={onClick} />
              ))}
            </>
          </Grid>
        </SlideFade>
      </VStack>
    </Modal>
  );
};

export default Gallery;
