import { Review } from '../../../../../../../../common/types';
import { FullMovie } from '../../../../../../../../common/types/movie';

export type ReviewsProps = {
	movie?: FullMovie;
	reviews?: Review[];
	isLoading?: boolean;
	onChangeTab: () => void;
};
