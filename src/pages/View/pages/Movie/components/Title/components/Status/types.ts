import { FullMovie } from '../../../../../../../../common/types/movie';
import { RenderProps } from '../../../../../../components/Title/types';

export type StatusProps = {
	status: FullMovie['status'];
	isLoading: boolean;
} & Omit<RenderProps, 'color' | 'fontWeight'>;
