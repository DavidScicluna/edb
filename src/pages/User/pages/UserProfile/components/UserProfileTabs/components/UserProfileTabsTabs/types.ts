import { TabsProps } from '@davidscicluna/component-library';

import { MediaItems } from '../../../../../../../../store/slices/Users/types';

export type UserProfileTabsTabsType = 'liked' | 'lists';

export type UserProfileTabsTabsProps = Pick<TabsProps, 'activeTab' | 'onChange'> & {
	type: UserProfileTabsTabsType;
	mediaItems: Partial<MediaItems>;
};
