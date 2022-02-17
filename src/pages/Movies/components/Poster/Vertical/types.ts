import { PartialMovie } from '../../../../../common/types/movie';

export type VerticalMoviePosterProps = {
	movie?: PartialMovie;
	width?: string | string[];
	isLoading?: boolean;
};
