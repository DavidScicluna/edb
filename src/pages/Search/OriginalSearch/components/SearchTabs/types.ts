import { TabsProps } from '@davidscicluna/component-library';

import { MediaType } from '../../../../../common/types';
import { CommonSearchProps } from '../../common/types';

export type SearchTabsProps = Pick<TabsProps, 'activeTab'> & Record<MediaType, CommonSearchProps<MediaType>>;
