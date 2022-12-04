import { TabsProps } from '@davidscicluna/component-library';

import { CreditsTabProps } from '../../types';

export type CreditsTabTabsProps = Pick<TabsProps, 'activeTab' | 'onChange'> &
	Pick<CreditsTabProps, 'movieDepartments' | 'tvShowDepartments'>;
