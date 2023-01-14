import { Nullable } from '@davidscicluna/component-library';

import { MediaType } from '../../../common/types';
import { GetMediaType } from '../Users/types';

export type BookmarkModalMediaType = Exclude<MediaType, 'person' | 'company' | 'collection'>;

export type BookmarkModal<MT extends BookmarkModalMediaType> = {
	isOpen: boolean;
	mediaType: MT;
	mediaItem: Nullable<GetMediaType<MT>>;
	title: string;
};

export type QuickViewModalMediaType = Exclude<MediaType, 'company'>;

export type QuickViewModal<MT extends QuickViewModalMediaType> = {
	isOpen: boolean;
	mediaType: MT;
	mediaItem: Nullable<GetMediaType<MT>>;
	title: string;
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
		bookmarkModal: BookmarkModal<BookmarkModalMediaType>;
		quickViewModal: QuickViewModal<QuickViewModalMediaType>;
		authenticationConfirmModal: AuthenticationConfirmModal;
		promptConfirmModal: PromptConfirmModal;
		isUserThemeModalOpen: boolean;
		isInternationalizationModalOpen: boolean;
		isSpinnerModalOpen: boolean;
	};
};
