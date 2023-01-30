import { NonNullable } from '@davidscicluna/component-library';

import { PersonCredits } from '../../../../common/types/person';

export type ViewKnownForCredits = NonNullable<PersonCredits['cast'] | PersonCredits['crew']>;

export type ViewKnownForProps = {
	credits?: PersonCredits;
	title?: string;
	subtitle?: string;
	emptyLabel: string;
	total?: number;
	isFetching?: boolean;
	isLoading?: boolean;
	isError?: boolean;
	isSuccess?: boolean;
	onFooterClick?: () => void;
};
