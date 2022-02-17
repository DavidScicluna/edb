import { MediaType } from '../../../../common/types';

export type MediaTypesPickerProps = {
	mediaTypes: MediaType[];
	label: string;
	description: string;
	onSetMediaType: (mediaType: MediaType) => void;
};
