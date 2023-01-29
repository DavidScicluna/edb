import { MediaItems } from '../../../../../../../../../../../../../store/slices/Users/types';
import { AllTabProps } from '../../types';

export type AllTabCollectionsProps = Pick<AllTabProps, 'type' | 'onSetActiveTab'> & {
	collections: MediaItems['collection'];
};
