import { ImageProps } from '../../../Image/types';

export type PosterImageProps = {
  width?: string | string[];
  orientation: 'horizontal' | 'vertical';
  isLoading: boolean;
} & ImageProps;
