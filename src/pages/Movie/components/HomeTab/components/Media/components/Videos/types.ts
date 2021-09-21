import { MediaProps } from '../../types';

export type VideosProps = {
  isError?: boolean;
  isSuccess?: boolean;
  isLoading?: boolean;
} & Omit<MediaProps, 'isError' | 'isSuccess' | 'isLoading' | 'photos' | 'backdrops'>;
