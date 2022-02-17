import { Video } from '../../../../../../common/types';

export type MediaVideoProps = {
	alt?: string;
	videoId?: Video['key'];
	isLoading?: boolean;
	onClick?: () => void;
};
