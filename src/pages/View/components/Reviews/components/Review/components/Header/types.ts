import { Review } from '../../../../../../../../common/types';

export type HeaderProps = {
	author: Review['author'];
	created_at: Review['created_at'];
	isLoading: boolean;
} & Review['author_details'];
