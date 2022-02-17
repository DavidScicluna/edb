import { ReactElement } from 'react';

import { MediaType } from '../../../../common/types';

type MediaTypesTotal = { [key in MediaType]?: number };

export type MediaTypesHeaderProps = {
	activeTab?: number;
	mediaTypes?: MediaType[];
	total: MediaTypesTotal;
	renderActions?: () => ReactElement;
};
