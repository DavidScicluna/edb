import { ReactElement } from 'react';

import { useMediaQuery, VStack, HStack } from '@chakra-ui/react';
import { Users as UsersIcon, Film as FilmIcon, Tv as TVIcon } from 'react-feather';

import { MediaType as MediaType } from '../../../../common/types/types';
import { MediaTypeItem as MediaTypeItemType } from '../../types';
import MediaTypeItem from '../MediaTypeItem';
import { MediaTypesProps } from './types';

const mediaTypesList: MediaTypeItemType[] = [
  {
    label: 'Movies',
    value: 'movie',
    icon: FilmIcon
  },
  {
    label: 'TV Shows',
    value: 'tv',
    icon: TVIcon
  },
  {
    label: 'People',
    value: 'person',
    icon: UsersIcon
  }
];

const MediaTypes = <MT,>(props: MediaTypesProps<MT>): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const { mediaTypes, mediaType, onSetType, onClose } = props;

  const handleClick = (mediaType: MediaType): void => {
    onSetType(mediaType);

    if (onClose) {
      onClose();
    }
  };

  return isSm ? (
    <VStack width='100%' justifyContent='space-between' spacing={3}>
      {mediaTypesList.map((mediaTypeItem) =>
        (mediaTypes && mediaTypes.includes(mediaTypeItem.value)) || !mediaTypes ? (
          <MediaTypeItem
            key={mediaTypeItem.value}
            {...mediaTypeItem}
            isActive={mediaTypeItem.value === mediaType}
            onClick={handleClick}
          />
        ) : null
      )}
    </VStack>
  ) : (
    <HStack width='100%' justifyContent='space-between' spacing={3}>
      {mediaTypesList.map((mediaTypeItem) =>
        (mediaTypes && mediaTypes.includes(mediaTypeItem.value)) || !mediaTypes ? (
          <MediaTypeItem
            key={mediaTypeItem.value}
            {...mediaTypeItem}
            isActive={mediaTypeItem.value === mediaType}
            onClick={handleClick}
          />
        ) : null
      )}
    </HStack>
  );
};

export default MediaTypes;
