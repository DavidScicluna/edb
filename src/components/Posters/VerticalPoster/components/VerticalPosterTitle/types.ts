import { MediaType } from '../../../../../common/types';
import { VerticalPosterProps } from '../../types';

export type VerticalPosterTitleProps<MT extends MediaType> = Pick<VerticalPosterProps<MT>, 'title'> & {
	inView: boolean;
};
