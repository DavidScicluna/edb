import { FullMovie } from '../../../../../../../../common/types/movie';
import { RenderProps } from '../../../../../../components/Title/types';

export type DateProps = {
	date: FullMovie['release_date'];
	isLoading: boolean;
} & Omit<RenderProps, 'fontWeight' | 'lineHeight'>;
