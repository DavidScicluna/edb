import { MediaProps } from '../../types';

export type PhotosProps = {
  isError?: boolean;
  isSuccess?: boolean;
  isLoading?: boolean;
} & Omit<MediaProps, 'isError' | 'isSuccess' | 'isLoading' | 'backdrops' | 'videos'>;
