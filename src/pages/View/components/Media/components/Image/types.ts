import { BoringAvatarType, Image } from '../../../../../../common/types';

export type MediaImageProps = {
  alt?: string;
  path?: Image['file_path'];
  boringType: BoringAvatarType;
  srcSize: [string, string];
  isLoading?: boolean;
  onClick?: () => void;
};
