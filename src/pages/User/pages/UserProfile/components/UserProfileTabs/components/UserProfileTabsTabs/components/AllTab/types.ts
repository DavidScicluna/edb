import { MediaType } from '../../../../../../../../../../common/types';
import { UserProfileTabsTabsProps } from '../../types';

type OnSetActiveTabProps = { mediaType: MediaType };

export type AllTabProps = Pick<UserProfileTabsTabsProps, 'type' | 'mediaItems'> & {
	onSetActiveTab?: (props: OnSetActiveTabProps) => void;
};
