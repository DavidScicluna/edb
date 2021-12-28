import { ReactElement } from 'react';

import { useMediaQuery, Stack } from '@chakra-ui/react';
import {
  PeopleAltOutlined as PeopleAltOutlinedIcon,
  PeopleAltTwoTone as PeopleAltTwoToneIcon,
  TheatersOutlined as TheatersOutlinedIcon,
  TvOutlined as TvOutlinedIcon,
  TvTwoTone as TvTwoToneIcon
} from '@material-ui/icons';

import { MediaType as MediaType } from '../../../../common/types';
import MediaTypeItem from './components/MediaTypeItem';
import { MediaTypeItem as MediaTypeItemType } from './components/MediaTypeItem/types';
import { MediaTypesProps } from './types';

const mediaTypesList: MediaTypeItemType[] = [
  {
    renderIcon: ({ isActive, fontSize }) =>
      isActive ? <TheatersOutlinedIcon style={{ fontSize }} /> : <TheatersOutlinedIcon style={{ fontSize }} />,
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
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const { mediaTypes, mediaType, onSetType, onClose } = props;

  const handleClick = (mediaType: MediaType): void => {
    onSetType(mediaType);

    if (onClose) {
      onClose();
    }
  };

  return (
    <Stack width='100%' direction={isSm ? 'column' : 'row'} spacing={2}>
      {mediaTypesList.map((mediaTypeItem) =>
        (mediaTypes && mediaTypes.includes(mediaTypeItem.value)) || !mediaTypes ? (
          <MediaTypeItem
            {...mediaTypeItem}
            key={mediaTypeItem.value}
            isActive={mediaTypeItem.value === mediaType}
            onClick={handleClick}
          />
        ) : null
      )}
    </Stack>
  );
};

export default MediaTypes;
