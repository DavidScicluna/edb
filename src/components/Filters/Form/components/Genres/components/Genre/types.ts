import { Genre } from '../../../../../../../common/types';

export type GenreProps = {
	isActive?: boolean;
	onClick: () => void;
} & Genre;
