import { QuickViewModalPosterProps } from '../../../QuickViewModalPoster/types';
import { CommonQuickViewModalPersonProps } from '../../common/types';

export type QuickViewModalPersonPosterProps = Pick<QuickViewModalPosterProps, 'onClick'> &
	CommonQuickViewModalPersonProps;
