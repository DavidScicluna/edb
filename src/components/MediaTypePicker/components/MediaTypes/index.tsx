import React, { ReactElement } from 'react';

import { useMediaQuery, VStack, HStack } from '@chakra-ui/react';
import {
  PeopleAltOutlined as PeopleAltOutlinedIcon,
  PeopleAltTwoTone as PeopleAltTwoToneIcon,
  TheatersOutlined as TheatersOutlinedIcon,
  TvOutlined as TvOutlinedIcon,
  TvTwoTone as TvTwoToneIcon
} from '@material-ui/icons';

import { MediaType as MediaType } from '../../../../common/types/types';
import { MediaTypeItem as MediaTypeItemType } from '../../types';
import MediaTypeItem from '../MediaTypeItem';
import { MediaTypesProps } from './types';

const mediaTypesList: MediaTypeItemType[] = [
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

const MediaTypes = <MT extends unknown>(props: MediaTypesProps<MT>): ReactElement => {
  const [isXs] = useMediaQuery('(max-width: 40em)');

  const { mediaTypes, mediaType, onSetType } = props;

  const handleClick = (mediaType: MediaType): void => {
    onSetType(mediaType);
  };

  return isXs ? (
    <VStack width='100%' justifyContent='space-between' spacing={2}>
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
    <HStack width='100%' justifyContent='space-between' spacing={2}>
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
