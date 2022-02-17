import { RenderProps } from '../../../../../../components/Title/types';

export type RuntimeProps = {
	runtime: number;
	isLoading: boolean;
} & Omit<RenderProps, 'fontWeight'>;
