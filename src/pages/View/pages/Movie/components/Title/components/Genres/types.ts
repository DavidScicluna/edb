import { FullMovie } from '../../../../../../../../common/types/movie';
import { RenderProps } from '../../../../../../components/Title/types';

export type GenresProps = {
	genres: FullMovie['genres'];
	isLoading: boolean;
} & Omit<RenderProps, 'fontWeight'>;
