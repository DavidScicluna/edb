import { BookmarkModal } from '../../../../../../../store/slices/Modals/types';

export type CommonBookmarkModalProps = BookmarkModal & {
	onClose: () => void;
};
