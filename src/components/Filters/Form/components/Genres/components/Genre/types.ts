import { Genre } from '../../../../../../../common/types';

export type GenreProps = {
	isActive?: boolean;
	isLoading?: boolean;
	onClick?: (genre: Genre) => void;
} & Partial<Genre>;
