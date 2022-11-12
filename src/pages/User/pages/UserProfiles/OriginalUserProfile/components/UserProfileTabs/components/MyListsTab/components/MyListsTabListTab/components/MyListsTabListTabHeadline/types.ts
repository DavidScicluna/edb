import { UserListMediaType } from '../../../../../../../../../../../../../store/slices/Users/types';
import { MyListsTabListTabProps } from '../../types';

export type MyListsTabListTabHeadlineProps = Pick<MyListsTabListTabProps, 'list' | 'onEditList' | 'onDeleteList'> & {
	mediaType?: UserListMediaType;
};
