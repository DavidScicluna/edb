import { ReactElement } from 'react';

import { MediaTypesPickerProps } from './types';

import { MediaType } from '../../../../common/types';
import Empty from '../../../../components/Empty';
import MediaTypes from '../../../../components/MediaTypes';

const MediaTypesPicker = ({ mediaTypes, label, description, onSetMediaType }: MediaTypesPickerProps): ReactElement => {
	return (
		<Empty
			button={
				mediaTypes.length > 0 ? (
					<MediaTypes
						mediaTypes={mediaTypes}
						onSetType={(mediaType: MediaType) => onSetMediaType(mediaType)}
					/>
				) : undefined
			}
			hasIllustration={mediaTypes.length === 0}
			label={mediaTypes.length > 0 ? 'Select Media-Type!' : label}
			description={mediaTypes.length > 0 ? 'Select the Media-Type that you would prefer to view' : description}
			size='xl'
			variant='outlined'
		/>
	);
};

export default MediaTypesPicker;
