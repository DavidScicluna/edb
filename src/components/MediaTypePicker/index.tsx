import { ReactElement } from 'react';

import { useDisclosure, Box } from '@chakra-ui/react';

import {
  LibraryBooksOutlined as LibraryBooksOutlinedIcon,
  LibraryBooksTwoTone as LibraryBooksTwoToneIcon,
  PeopleAltOutlined as PeopleAltOutlinedIcon,
  PeopleAltTwoTone as PeopleAltTwoToneIcon,
  TheatersOutlined as TheatersOutlinedIcon,
  TheatersTwoTone as TheatersTwoToneIcon,
  TvOutlined as TvOutlinedIcon,
  TvTwoTone as TvTwoToneIcon,
  BusinessOutlined as BusinessOutlinedIcon,
  BusinessTwoTone as BusinessTwoToneIcon
} from '@material-ui/icons';


import MediaTypes from './components/MediaTypes';
import { MediaTypePickerProps } from './types';

import { useSelector } from '../../common/hooks';
import { MediaType } from '../../common/types';
import Modal from '../Modal';

const MediaTypePicker = <MT extends MediaType>(props: MediaTypePickerProps<MT>): ReactElement => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const color = useSelector((state) => state.user.ui.theme.color);

  const { renderToggleModal, mediaType, ...rest } = props;

  const handleReturnIcon = (): ReactElement | undefined => {
    switch (mediaType) {
      case 'movie':
        return isOpen ? <TheatersTwoToneIcon /> : <TheatersOutlinedIcon />;
      case 'tv':
        return isOpen ? <TvTwoToneIcon /> : <TvOutlinedIcon />;
      case 'person':
        return isOpen ? <PeopleAltTwoToneIcon /> : <PeopleAltOutlinedIcon />;
      case 'company':
        return isOpen ? <BusinessTwoToneIcon /> : <BusinessOutlinedIcon />;
      case 'collection':
        return isOpen ? <LibraryBooksTwoToneIcon /> : <LibraryBooksOutlinedIcon />;
      default:
        return undefined;
    }
  };

  return (
    <>
      {renderToggleModal({
        color: isOpen ? color : 'gray',
        label: 'Change Media-Type',
        icon: handleReturnIcon(),
        onClick: () => onOpen()
      })}

      <Modal title='Select Media-Type' isOpen={isOpen} onClose={onClose} isCentered size='4xl'>
        <Box width='100%' height='100%' p={3}>
          <MediaTypes {...rest} mediaType={mediaType} onClose={onClose} />
        </Box>
      </Modal>
    </>
  );
};

export default MediaTypePicker;
