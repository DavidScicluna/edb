import { Video } from '../../../../../../common/types';
import { AssetsTabProps } from '../../types';

export type VideosProps = {
	videos: Video[];
	isError?: boolean;
	isLoading?: boolean;
	isSuccess?: boolean;
	onClickVideo?: (videoId: string) => void;
} & Omit<AssetsTabProps, 'images' | 'videos' | 'isError' | 'isSuccess' | 'isLoading' | 'onClickAsset'>;
