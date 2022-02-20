import { MediaType } from '../../common/types';

export type MediaTypesProps<MT extends MediaType> = {
	mediaTypes?: MediaType[];
	mediaType?: MT;
	onSetType: (mediaType: MediaType) => void;
};
