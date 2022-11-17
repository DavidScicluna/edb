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

export type AuthenticationConfirmModal = {
	isOpen: boolean;
	title: string;
	description: string | string[];
};

export type PromptConfirmModal = {
	isOpen: boolean;
	title: string;
	subtitle: string;
	onConfirm: () => void;
};

export type StateProps = {
	ui: {
		bookmarkModal: BookmarkModal;
		quickViewModal: QuickViewModal;
		authenticationConfirmModal: AuthenticationConfirmModal;
		promptConfirmModal: PromptConfirmModal;
		isUserThemeModalOpen: boolean;
		isInternationalizationModalOpen: boolean;
		isSpinnerModalOpen: boolean;
	};
};
