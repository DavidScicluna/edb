import { ReactElement } from 'react';

import { VStack, SlideFade } from '@chakra-ui/react';

import Modal from '../../../Modal';
import Panel from './components/Panel';
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
          <Panel title='Photos' total={photos?.length || 0}>
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
          </Panel>
        </SlideFade>

        {/* Backdrops Section */}
        <SlideFade in={backdrops && backdrops.length > 0} unmountOnExit style={{ width: '100%' }}>
          <Panel title='Backdrops' total={backdrops?.length || 0}>
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
          </Panel>
        </SlideFade>

        {/* Videos Section */}
        <SlideFade in={videos && videos.length > 0} unmountOnExit style={{ width: '100%' }}>
          <Panel title='Videos' total={videos?.length || 0}>
            <>
              {videos?.map((video, index) => (
                <Video key={index} video={video} isActive={video.key === activePath} onClickVideo={onClick} />
              ))}
            </>
          </Panel>
        </SlideFade>
      </VStack>
    </Modal>
  );
};

export default Gallery;
