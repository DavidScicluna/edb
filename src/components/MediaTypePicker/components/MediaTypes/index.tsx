import { ReactElement } from 'react';

import { SimpleGrid, Center } from '@chakra-ui/react';
import {
  PeopleAltOutlined as PeopleAltOutlinedIcon,
  PeopleAltTwoTone as PeopleAltTwoToneIcon,
  TheatersOutlined as TheatersOutlinedIcon,
  TheatersTwoTone as TheatersTwoToneIcon,
  TvOutlined as TvOutlinedIcon,
  TvTwoTone as TvTwoToneIcon
} from '@material-ui/icons';

import { MediaType as MediaType } from '../../../../common/types';
import MediaTypeItem from './components/MediaTypeItem';
import { MediaTypeItem as MediaTypeItemType } from './components/MediaTypeItem/types';
import { MediaTypesProps } from './types';

export const mediaTypesList: MediaTypeItemType[] = [
  {
    renderIcon: ({ isActive, fontSize }) =>
      isActive ? <TheatersTwoToneIcon style={{ fontSize }} /> : <TheatersOutlinedIcon style={{ fontSize }} />,
    label: 'Movies',
    value: 'movie'
  },
  {
    renderIcon: ({ isActive, fontSize }) =>
      isActive ? <TvTwoToneIcon style={{ fontSize }} /> : <TvOutlinedIcon style={{ fontSize }} />,
    label: 'TV Shows',
    value: 'tv'
  },
  {
    renderIcon: ({ isActive, fontSize }) =>
      isActive ? <PeopleAltTwoToneIcon style={{ fontSize }} /> : <PeopleAltOutlinedIcon style={{ fontSize }} />,
    label: 'People',
    value: 'person'
  }
];

const MediaTypes = <MT extends MediaType>(props: MediaTypesProps<MT>): ReactElement => {
  const { mediaTypes, mediaType, onSetType, onClose } = props;

  const handleClick = (mediaType: MediaType): void => {
    onSetType(mediaType);

    if (onClose) {
      onClose();
    }
  };

  return (
    <SimpleGrid width='100%' columns={[1, 1, 3]} spacing={2}>
      {mediaTypesList.map((mediaTypeItem) =>
        (mediaTypes && mediaTypes.includes(mediaTypeItem.value)) || !mediaTypes ? (
          <Center width='100%'>
            <MediaTypeItem
              {...mediaTypeItem}
              key={mediaTypeItem.value}
              isActive={mediaTypeItem.value === mediaType}
              onClick={handleClick}
            />
          </Center>
        ) : null
      )}
    </SimpleGrid>
  );
};

export default MediaTypes;
