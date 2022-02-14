import { ReactElement } from 'react';

import { Center } from '@chakra-ui/react';

import { useSelector } from '../../../../common/hooks';
import Accordions from '../../../Accordions';
import Modal from '../../../Modal';
import Asset from './components/Asset';
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
          renderAccordion={({ id, title, data }) => (
            <Asset key={id} alt={alt} activeMediaItem={activeMediaItem} title={title} data={data} onClick={onClick} />
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
