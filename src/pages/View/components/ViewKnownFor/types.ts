import { NonNullable } from '@davidscicluna/component-library';

import { Credits } from '../../../../common/types/person';

export type ViewKnownForCredits = NonNullable<Credits['cast'] | Credits['crew']>;

export type ViewKnownForProps = {
	credits?: Credits;
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
