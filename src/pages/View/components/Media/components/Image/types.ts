import { BoringAvatarType, Image } from '../../../../../../common/types';
import { AssetType } from '../../types';

export type MediaImageProps = {
	alt?: string;
	path?: Image['file_path'];
	ratio?: number;
	type: Omit<AssetType, 'video'>;
	boringType: BoringAvatarType;
	isLoading?: boolean;
	onClick?: () => void;
};
