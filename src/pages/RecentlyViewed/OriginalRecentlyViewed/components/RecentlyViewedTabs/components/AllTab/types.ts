import { TabsOnChangeProps } from '@davidscicluna/component-library';

import { RecentlyViewedMediaTypes } from '../../../../types';

export type AllTabProps = {
	mediaTypes: RecentlyViewedMediaTypes;
	onSetActiveTab: (props: TabsOnChangeProps) => void;
};
