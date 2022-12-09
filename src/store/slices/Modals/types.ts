import { Nullable } from '@davidscicluna/component-library';

import { MediaType } from '../../../common/types';
import { GetMediaType } from '../Users/types';

export interface BookmarkModal {
	isOpen: boolean;
	mediaType: MediaType;
	mediaItem: Nullable<GetMediaType<this['mediaType']>>;
	title: string;
}

export interface QuickViewModal {
	isOpen: boolean;
	mediaType: MediaType;
	mediaItem: Nullable<GetMediaType<this['mediaType']>>;
}

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
