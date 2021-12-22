import { ReactElement } from 'react';

import { useColorMode, Text } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

import { useSelector } from '../../../../../common/hooks';
import Button from '../../../../../components/Clickable/Button';
import Link from '../../../../../components/Clickable/Link';
import Modal from '../../../../../components/Modal';
import { defaultDescriptionModal, toggleDescription } from '../../../../../store/slices/Modals';

const DescriptionModal = (): ReactElement => {
  const { colorMode } = useColorMode();

  const dispatch = useDispatch();
  const descriptionModal = useSelector((state) => state.modals.ui.descriptionModal);

  return (
    <Modal
      title={`${descriptionModal.mediaItem ? `"${descriptionModal.mediaItem.title}"` : 'Unknown'} description`}
      renderActions={({ color, colorMode, size }) => (
        <Link to={{ pathname: `/${defaultDescriptionModal.mediaType}/${descriptionModal.mediaItem?.id}` }}>
          <Button color={color} colorMode={colorMode} size={size}>
            {`View ${descriptionModal.mediaItem ? `"${descriptionModal.mediaItem.title}"` : ''}`}
          </Button>
        </Link>
      )}
      isOpen={descriptionModal.open}
      onClose={() => dispatch(toggleDescription({ ...defaultDescriptionModal }))}
      isCentered
      size='2xl'
    >
      <Text
        align='left'
        color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
        fontSize='lg'
        fontWeight='normal'
        px={3}
        py={2}
      >
        {descriptionModal.mediaItem ? descriptionModal.mediaItem.description : 'N/A'}
      </Text>
    </Modal>
  );
};

export default DescriptionModal;
