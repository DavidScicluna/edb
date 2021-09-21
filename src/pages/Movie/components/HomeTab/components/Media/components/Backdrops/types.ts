import { MediaProps } from '../../types';

export type BackdropsProps = {
  isError?: boolean;
  isSuccess?: boolean;
  isLoading?: boolean;
} & Omit<MediaProps, 'isError' | 'isSuccess' | 'isLoading' | 'photos' | 'videos'>;
