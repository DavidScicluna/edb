import { QuickViewModalMediaType, QuickViewModal } from '../../../../../../../store/slices/Modals/types';

export type QuickViewModalBodyProps = Pick<QuickViewModal<QuickViewModalMediaType>, 'mediaType' | 'mediaItem'>;
