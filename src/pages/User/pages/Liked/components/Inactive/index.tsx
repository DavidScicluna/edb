import React, { ReactElement } from 'react';

import { MediaType } from '../../../../../../common/types';
import Empty from '../../../../../../components/Empty';
import MediaTypes from '../../../../../../components/MediaTypePicker/components/MediaTypes';
import { InactiveProps } from './types';

const Inactive = ({ mediaTypes, onSetMediaType }: InactiveProps): ReactElement => {
  return (
    <Empty
      button={
        mediaTypes.length > 0 ? (
          <MediaTypes mediaTypes={mediaTypes} onSetType={(mediaType: MediaType) => onSetMediaType(mediaType)} />
        ) : undefined
      }
      hasIllustration={mediaTypes.length === 0}
      label={mediaTypes.length > 0 ? 'Select Media-Type!' : 'Oh no liked list is empty!'}
      description={
        mediaTypes.length > 0
          ? 'Select the Media-Type that you would prefer to view'
          : 'Unfortunatly you have not liked any items. Please like an item to view it in liked list.'
      }
      size='xl'
      variant='outlined'
    />
  );
};

export default Inactive;
