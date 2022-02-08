import { Image } from '../../../../../../../../common/types';
import { AssetsTabProps } from '../../types';

export type BackdropsProps = {
  backdrops?: Image[];
} & Omit<AssetsTabProps, 'images'>;
