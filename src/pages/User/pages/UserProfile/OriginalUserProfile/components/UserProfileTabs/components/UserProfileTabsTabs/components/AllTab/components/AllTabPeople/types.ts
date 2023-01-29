import { MediaItems } from '../../../../../../../../../../../../../store/slices/Users/types';
import { AllTabProps } from '../../types';

export type AllTabPeopleProps = Pick<AllTabProps, 'type' | 'onSetActiveTab'> & {
	people: MediaItems['person'];
};
