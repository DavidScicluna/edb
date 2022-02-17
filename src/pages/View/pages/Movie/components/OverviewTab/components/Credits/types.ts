import { ReactElement } from 'react';

import { Crew } from '../../../../../../../../common/types/movie';

export type ListItem = {
	label: string;
	children?: ReactElement;
};

export type CreditsProps = {
	crew?: Crew[];
	isLoading?: boolean;
};
