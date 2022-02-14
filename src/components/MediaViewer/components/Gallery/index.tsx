import { ReactElement } from 'react';

import { Center } from '@chakra-ui/react';

import { useSelector } from '../../../../common/hooks';
import Accordions from '../../../Accordions';
import VerticalGrid from '../../../Grid/Vertical';
import Modal from '../../../Modal';
import Image from './components/Image';
import Video from './components/Video';
import { GalleryProps } from './types';

const Gallery = (props: GalleryProps): ReactElement => {
  const color = useSelector((state) => state.user.ui.theme.color);

  const { alt, assets, activeMediaItem, isOpen = false, onClick, onClose } = props;

  return (
    <Modal title='Gallery' isOpen={isOpen} onClose={onClose} isCentered size='full'>
      <Center p={2}>
        <Accordions
          accordions={assets.map((asset) => {
            return {
              id: asset.label.toLowerCase(),
              title: asset.label,
              total: {
                number: asset.mediaItems.length
              },
              data: asset.mediaItems
            };
          })}
          renderAccordion={({ id, data }) => (
            <VerticalGrid key={id} columns={[1, 2, 3, 3, 4, 5]} displayMode='grid'>
              {() =>
                (data || []).map((mediaItem, id) =>
                  mediaItem.type === 'image' ? (
                    <Image
                      key={id}
                      alt={alt}
                      ratio={mediaItem.data.aspect_ratio}
                      path={mediaItem.data.file_path}
                      boringType={mediaItem.boringType}
                      srcSize={mediaItem.srcSize}
                      isActive={mediaItem.data.file_path === activeMediaItem?.data.file_path}
                      onClick={() => onClick(mediaItem)}
                    />
                  ) : (
                    <Video
                      key={id}
                      alt={alt}
                      videoId={mediaItem.data.key}
                      isActive={mediaItem.data.key === activeMediaItem?.data.key}
                      onClick={() => onClick(mediaItem)}
                    />
                  )
                )
              }
            </VerticalGrid>
          )}
          color={color}
          isLoading={false}
          isError={false}
        />
      </Center>
    </Modal>
  );
};

export default Gallery;
