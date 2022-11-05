import { MediaItems } from '../../../../../../../../../../../../store/slices/Users/types';
import { AllTabProps } from '../../types';

export type AllTabMoviesProps = Pick<AllTabProps, 'type' | 'onSetActiveTab'> & {
	movies: MediaItems['movie'];
};
