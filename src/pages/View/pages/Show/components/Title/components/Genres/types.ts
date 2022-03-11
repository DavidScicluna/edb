import { FullTV } from '../../../../../../../../common/types/tv';
import { RenderProps } from '../../../../../../components/Title/types';

export type GenresProps = {
	genres: FullTV['genres'];
	isLoading: boolean;
} & Omit<RenderProps, 'fontWeight' | 'lineHeight'>;
