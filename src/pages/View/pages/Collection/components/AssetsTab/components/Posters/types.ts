import { Image } from '../../../../../../../../common/types';
import { AssetsTabProps } from '../../types';

export type PostersProps = {
  posters?: Image[];
} & Omit<AssetsTabProps, 'images'>;
