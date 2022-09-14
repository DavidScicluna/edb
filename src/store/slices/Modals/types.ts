import { MediaType } from '../../../common/types';
import { GetMediaType } from '../Users/types';

export interface BookmarkModal {
	mediaType: MediaType;
	mediaItem: GetMediaType<this['mediaType']> | null;
	isOpen: boolean;
	title: string;
}

export type QuickViewModal = {
	isOpen: boolean;
	mediaType: MediaType;
	mediaItem: { id: number; title: string } | null;
};

export type StateProps = {
	ui: {
		bookmarkModal: BookmarkModal;
		quickViewModal: QuickViewModal;
		isUserThemeModalOpen: boolean;
		isInternationalizationModalOpen: boolean;
		isSpinnerModalOpen: boolean;
	};
};
