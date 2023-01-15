import { QuickViewModalPosterProps } from '../../../QuickViewModalPoster/types';
import { CommonQuickViewModalTVShowProps } from '../../common/types';

export type QuickViewModalTVShowPosterProps = Pick<QuickViewModalPosterProps, 'onClick'> &
	CommonQuickViewModalTVShowProps;
