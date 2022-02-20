import { ReactElement } from 'react';

import { FullMovie } from '../../../../../../../../common/types/movie';

export type ListItem = {
	label: string;
	children?: ReactElement;
};

export type DetailsProps = {
	movie?: FullMovie;
	isLoading?: boolean;
};
