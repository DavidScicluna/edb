import { MediaType } from '../../../common/types';
import { GetMediaType } from '../Users/types';

export interface ListModal {
	isOpen: boolean;
	title: string;
	mediaType: MediaType;
	mediaItem: GetMediaType<this['mediaType']> | null;
}

export type QuickViewModal = {
	isOpen: boolean;
	mediaType: MediaType;
	mediaItem: { id: number; title: string } | null;
};

export type StateProps = {
	ui: {
		listsModal: ListModal;
		quickViewModal: QuickViewModal;
		isUserThemeModalOpen: boolean;
		isInternationalizationModalOpen: boolean;
		isSpinnerModalOpen: boolean;
	};
};
