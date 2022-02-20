import { Image, Video } from '../../../../common/types';
import { AssetType } from '../../../../components/MediaViewer/types';

export type AssetsTabProps = {
	alt?: string;
	assets?: {
		profiles?: Image[];
		posters?: Image[];
		backdrops?: Image[];
		videos?: Video[];
	};
	isError?: boolean;
	isSuccess?: boolean;
	isLoading?: boolean;
	onClickAsset: (path: string, type: AssetType) => void;
};
