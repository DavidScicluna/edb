import { QuickViewModalPosterProps } from '../../../QuickViewModalPoster/types';
import { CommonQuickViewModalCollectionProps } from '../../common/types';

export type QuickViewModalCollectionPosterProps = Pick<QuickViewModalPosterProps, 'onClick'> &
	CommonQuickViewModalCollectionProps;
