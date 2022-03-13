import { Genre } from '../../../../../../../../common/types';
import { GenresProps } from '../../../../types';

export type GenreProps = Partial<Genre> & {
	isActive?: boolean;
	isLoading?: boolean;
	onClick?: (genre: Genre) => void;
} & Omit<GenresProps, 'form'>;
