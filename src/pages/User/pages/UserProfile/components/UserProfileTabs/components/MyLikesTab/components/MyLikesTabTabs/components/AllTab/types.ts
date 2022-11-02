import { MediaType } from '../../../../../../../../../../../../common/types';

type OnSetActiveTabProps = { mediaType: MediaType };

export type AllTabProps = {
	onSetActiveTab?: (props: OnSetActiveTabProps) => void;
};
