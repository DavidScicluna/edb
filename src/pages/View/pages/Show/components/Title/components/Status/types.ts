import { FullTV } from '../../../../../../../../common/types/tv';
import { RenderProps } from '../../../../../../components/Title/types';

export type StatusProps = {
	status: FullTV['status'];
	isLoading: boolean;
} & Omit<RenderProps, 'color' | 'fontWeight'>;
