import { Video } from '../../../../../../common/types';
import { AssetsTabProps } from '../../types';

export type AssetVideoProps = Omit<Video, 'key'> & {
	videoId?: Video['key'];
	isLoading?: boolean;
	onClickVideo?: (videoId: string) => void;
} & Omit<AssetsTabProps, 'images' | 'videos' | 'isError' | 'isSuccess' | 'isLoading' | 'onClickAsset'>;
