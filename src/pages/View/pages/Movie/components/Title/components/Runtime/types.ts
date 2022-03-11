import { FullMovie } from '../../../../../../../../common/types/movie';
import { RenderProps } from '../../../../../../components/Title/types';

export type RuntimeProps = {
	runtime: FullMovie['runtime'];
	isLoading: boolean;
} & Omit<RenderProps, 'fontWeight' | 'lineHeight'>;
