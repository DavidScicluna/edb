import React, { ReactElement } from 'react';

import { useMediaQuery, Box, VStack, HStack } from '@chakra-ui/react';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone';
import TheatersOutlinedIcon from '@material-ui/icons/TheatersOutlined';
import TvOutlinedIcon from '@material-ui/icons/TvOutlined';
import TvTwoToneIcon from '@material-ui/icons/TvTwoTone';

import { MediaType as MediaType } from '../../common/types/types';
import Modal from '../Modal';
import MediaTypeItem from './components/MediaTypeItem';
import { MediaTypePickerProps, MediaTypeItem as MediaTypeItemType } from './types';

const mediaTypes: MediaTypeItemType[] = [
  {
    label: 'Movies',
    value: 'movie',
    iconActive: TheatersOutlinedIcon,
    icon: TheatersOutlinedIcon
  },
  {
    label: 'TV Shows',
    value: 'tv',
    iconActive: TvTwoToneIcon,
    icon: TvOutlinedIcon
  },
  {
    label: 'People',
    value: 'person',
    iconActive: PeopleAltTwoToneIcon,
    icon: PeopleAltOutlinedIcon
  }
];

const MediaTypePicker = ({ mediaType, isOpen, onClose, onSetType }: MediaTypePickerProps): ReactElement => {
  const [isXs] = useMediaQuery('(max-width: 40em)');

  const handleClick = (mediaType: MediaType) => {
    onSetType(mediaType);
    onClose();
  };

  return (
    <Modal title='Select media type' isOpen={isOpen} onClose={onClose} isCentered size='2xl'>
      <Box width='100%' p={3}>
        {isXs ? (
          <VStack justifyContent='space-between' spacing={2}>
            {mediaTypes.map((mediaTypeItem) => (
              <MediaTypeItem
                key={mediaTypeItem.value}
                {...mediaTypeItem}
                isActive={mediaTypeItem.value === mediaType}
                onClick={handleClick}
              />
            ))}
          </VStack>
        ) : (
          <HStack justifyContent='space-between' spacing={2}>
            {mediaTypes.map((mediaTypeItem) => (
              <MediaTypeItem
                key={mediaTypeItem.value}
                {...mediaTypeItem}
                isActive={mediaTypeItem.value === mediaType}
                onClick={handleClick}
              />
            ))}
          </HStack>
        )}
      </Box>
    </Modal>
  );
};

export default MediaTypePicker;
