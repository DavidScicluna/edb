import { PartialMovie } from '../../../../../common/types/movie';

export type HorizontalMoviesProps = {
	isError?: boolean;
	isSuccess?: boolean;
	isLoading?: boolean;
	movies?: PartialMovie[];
};
