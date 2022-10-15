import { UserSearch } from '../../../../../../../../../store/slices/Users/types';
import { RecentSearchesProps } from '../../types';

export type RecentSearchProps = UserSearch & Pick<RecentSearchesProps, 'onSearchClick'>;
