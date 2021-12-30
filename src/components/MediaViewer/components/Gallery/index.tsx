import { ReactElement } from 'react';

import { useMediaQuery, VStack, SimpleGrid, SlideFade } from '@chakra-ui/react';

import Badge from '../../../Badge';
import Modal from '../../../Modal';
import Panel from '../../../Panel';
import Photo from './components/Photo';
import Video from './components/Video';
import { GalleryProps } from './types';

const Gallery = (props: GalleryProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');
  const [isSmallMob] = useMediaQuery('(max-width: 340px)');

  const { isOpen, name, activePath, photos, backdrops, videos, mediaType, onClick, onClose } = props;

  return (
    <Modal title='Gallery' isOpen={isOpen} onClose={onClose} isCentered size='full'>
      <VStack width='100%' p={2} spacing={10}>
        {/* Photos Section */}
        <SlideFade in={photos && photos.length > 0} unmountOnExit style={{ width: '100%' }}>
          <Panel isFullWidth variant='transparent' size='sm'>
            {{
              header: {
                title: 'Photos',
                actions: photos?.length || 0 > 0 ? <Badge size={isSm ? 'sm' : 'md'}>{String(photos)}</Badge> : undefined
              },
              body: (
                <SimpleGrid width='100%' columns={[isSmallMob ? 1 : 2, 2, 3, 4, 5, 6]} spacing={2}>
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
                </SimpleGrid>
              )
            }}
          </Panel>
        </SlideFade>

        {/* Backdrops Section */}
        <SlideFade in={backdrops && backdrops.length > 0} unmountOnExit style={{ width: '100%' }}>
          <Panel isFullWidth variant='transparent' size='sm'>
            {{
              header: {
                title: 'Backdrops',
                actions:
                  backdrops?.length || 0 > 0 ? <Badge size={isSm ? 'sm' : 'md'}>{String(backdrops)}</Badge> : undefined
              },
              body: (
                <SimpleGrid width='100%' columns={[isSmallMob ? 1 : 2, 2, 3, 4, 5, 6]} spacing={2}>
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
                </SimpleGrid>
              )
            }}
          </Panel>
        </SlideFade>

        {/* Videos Section */}
        <SlideFade in={videos && videos.length > 0} unmountOnExit style={{ width: '100%' }}>
          <Panel isFullWidth variant='transparent' size='sm'>
            {{
              header: {
                title: 'Videos',
                actions: videos?.length || 0 > 0 ? <Badge size={isSm ? 'sm' : 'md'}>{String(videos)}</Badge> : undefined
              },
              body: (
                <SimpleGrid width='100%' columns={[isSmallMob ? 1 : 2, 2, 3, 4, 5, 6]} spacing={2}>
                  {videos?.map((video, index) => (
                    <Video key={index} video={video} isActive={video.key === activePath} onClickVideo={onClick} />
                  ))}
                </SimpleGrid>
              )
            }}
          </Panel>
        </SlideFade>
      </VStack>
    </Modal>
  );
};

export default Gallery;
