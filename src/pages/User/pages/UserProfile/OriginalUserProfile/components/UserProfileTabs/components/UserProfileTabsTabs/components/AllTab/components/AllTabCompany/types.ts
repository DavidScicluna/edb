import { MediaItems } from '../../../../../../../../../../../../../store/slices/Users/types';
import { AllTabProps } from '../../types';

export type AllTabCompanyProps = Pick<AllTabProps, 'type' | 'onSetActiveTab'> & {
	companies: MediaItems['company'];
};
