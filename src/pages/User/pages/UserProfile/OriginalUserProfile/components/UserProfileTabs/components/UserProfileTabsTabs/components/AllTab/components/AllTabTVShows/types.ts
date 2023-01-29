import { MediaItems } from '../../../../../../../../../../../../../store/slices/Users/types';
import { AllTabProps } from '../../types';

export type AllTabTVShowsProps = Pick<AllTabProps, 'type' | 'onSetActiveTab'> & {
	shows: MediaItems['tv'];
};
