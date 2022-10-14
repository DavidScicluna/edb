import { MediaType } from '../../../../../../../common/types';
import { SearchTabsProps } from '../../types';

type OnSetActiveTabProps = { mediaType: MediaType };

type Picked = 'movies' | 'shows' | 'people' | 'companies' | 'collections';

export type AllTabProps = Pick<SearchTabsProps, Picked> & {
	query: string;
	onSetActiveTab?: (props: OnSetActiveTabProps) => void;
};
