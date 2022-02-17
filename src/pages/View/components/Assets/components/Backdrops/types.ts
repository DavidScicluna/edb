import { Image } from '../../../../../../common/types';
import { AssetsTabProps } from '../../types';

export type BackdropsProps = {
	backdrops: Image[];
	isError?: boolean;
	isLoading?: boolean;
	isSuccess?: boolean;
	onClickImage?: (path: string) => void;
} & Omit<AssetsTabProps, 'images' | 'videos' | 'isError' | 'isSuccess' | 'isLoading' | 'onClickAsset'>;
