import React, { ReactElement } from 'react';

import {
  useColorMode,
  useMediaQuery,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  HStack,
  Text,
  VStack
} from '@chakra-ui/react';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone';
import TheatersOutlinedIcon from '@material-ui/icons/TheatersOutlined';
import TvOutlinedIcon from '@material-ui/icons/TvOutlined';
import TvTwoToneIcon from '@material-ui/icons/TvTwoTone';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';

import { MediaType as MediaType } from '../../../../common/types/types';
import IconButton from '../../../../components/Inputs/IconButton';
import Type from './components/Type';
import { TypePickerProps, TypeItem } from './types';

const types: TypeItem[] = [
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

const TypePicker = ({ mediaType, isOpen, onClose }: TypePickerProps): ReactElement => {
  const { colorMode } = useColorMode();
  const [isXs] = useMediaQuery('(max-width: 40em)');

  const history = useHistory();

  const handleClick = (mediaType: MediaType) => {
    history.push({ pathname: history.location.pathname, search: queryString.stringify({ mediaType }) });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset='scale' size='2xl'>
      <ModalOverlay />
      <ModalContent mx={isXs ? 3 : 0}>
        <ModalHeader
          px={3}
          py={1}
          borderBottom='solid2'
          borderBottomColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}>
          <HStack justifyContent='space-between'>
            <Text
              align='left'
              fontSize='xl'
              fontWeight='semibold'
              color={colorMode === 'light' ? 'gray.900' : 'gray.50'}>
              Select media type
            </Text>

            <IconButton
              aria-label='Close type picker modal?'
              icon={CloseOutlinedIcon}
              onClick={() => onClose()}
              size='sm'
              variant='icon'
            />
          </HStack>
        </ModalHeader>
        <ModalBody p={3}>
          {isXs ? (
            <VStack justifyContent='space-between' spacing={2}>
              {types.map((typeItem) => (
                <Type
                  key={typeItem.value}
                  {...typeItem}
                  isActive={typeItem.value === mediaType}
                  onClick={handleClick}
                />
              ))}
            </VStack>
          ) : (
            <HStack justifyContent='space-between' spacing={2}>
              {types.map((typeItem) => (
                <Type
                  key={typeItem.value}
                  {...typeItem}
                  isActive={typeItem.value === mediaType}
                  onClick={handleClick}
                />
              ))}
            </HStack>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TypePicker;
