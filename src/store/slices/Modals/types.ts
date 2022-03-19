import { MediaType } from '../../../common/types';
import { GetMediaType } from '../Users/types';

export interface ListModal {
	open: boolean;
	title: string;
	mediaType: MediaType;
	mediaItem?: GetMediaType<this['mediaType']>;
}

export type QuickViewModal = {
	open: boolean;
	mediaType: MediaType;
	mediaItem?: { id: number; title: string };
};

export type StateProps = {
	ui: {
		listsModal: ListModal;
		quickViewModal: QuickViewModal;
		isDisplayModalOpen: boolean;
		isUserSwitcherModalOpen: boolean;
		isSplashscreenOpen: boolean;
	};
};
