import { ReactElement } from 'react';

import { MediaType } from '../../../../common/types';
import Empty from '../../../../components/Empty';
import MediaTypes, { mediaTypesList } from '../../../../components/MediaTypePicker/components/MediaTypes';
import { MediaTypesPickerProps } from './types';

const MediaTypesPicker = ({ onSelected }: MediaTypesPickerProps): ReactElement => {
  return (
    <Empty
      button={
        <MediaTypes
          mediaTypes={['movie', 'tv', 'person']}
          onSetType={(mediaType: MediaType) =>
            onSelected(mediaTypesList.findIndex((paramMediaType) => mediaType === paramMediaType.value))
          }
        />
      }
      hasIllustration={false}
      label='Select Media-Type'
      description='Select the Media-Type list that you would prefer to view'
      size='xl'
      variant='outlined'
    />
  );
};

export default MediaTypesPicker;
