import { MediaType } from '../../../../../common/types';
import { HorizontalPosterProps } from '../../types';

export type HorizontalPosterDescriptionProps<MT extends MediaType> = Pick<HorizontalPosterProps<MT>, 'description'> & {
	inView: boolean;
};
