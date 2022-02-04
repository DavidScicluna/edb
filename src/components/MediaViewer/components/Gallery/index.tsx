import { ReactElement } from 'react';

import { VStack, Fade } from '@chakra-ui/react';
import CountUp from 'react-countup';

import Badge from '../../../Badge';
import VerticalGrid from '../../../Grid/Vertical';
import Modal from '../../../Modal';
import Panel from '../../../Panel';
import Image from './components/Image';
import Video from './components/Video';
import { GalleryProps } from './types';

const Gallery = (props: GalleryProps): ReactElement => {
  const { alt, assets, activeMediaItem, isOpen = false, onClick, onClose } = props;

  return (
    <Modal title='Gallery' isOpen={isOpen} onClose={onClose} isCentered size='full'>
      <VStack width='100%' p={2} spacing={10}>
        {assets.map((asset, index: number) => (
          <Panel key={index} isFullWidth variant='transparent' size='sm'>
            {{
              header: {
                title: asset.label,
                actions:
                  asset.mediaItems.length || 0 > 0 ? (
                    <Fade in unmountOnExit>
                      <Badge size='lg'>
                        <CountUp duration={1} end={asset.mediaItems.length || 0} />
                      </Badge>
                    </Fade>
                  ) : undefined
              },
              body: (
                <VerticalGrid displayMode='grid'>
                  {() =>
                    asset.mediaItems.map((mediaItem) =>
                      mediaItem.type === 'image' ? (
                        <Image
                          key={mediaItem.data.id}
                          alt={alt}
                          boringType={mediaItem.boringType}
                          path={mediaItem.data.file_path}
                          srcSize={mediaItem.srcSize}
                          isActive={mediaItem.data.file_path === activeMediaItem?.data.file_path}
                          onClick={() => onClick(mediaItem)}
                        />
                      ) : (
                        <Video
                          key={mediaItem.data.id}
                          alt={alt}
                          videoId={mediaItem.data.key}
                          isActive={mediaItem.data.key === activeMediaItem?.data.key}
                          onClick={() => onClick(mediaItem)}
                        />
                      )
                    )
                  }
                </VerticalGrid>
              )
            }}
          </Panel>
        ))}
      </VStack>
    </Modal>
  );
};

export default Gallery;
