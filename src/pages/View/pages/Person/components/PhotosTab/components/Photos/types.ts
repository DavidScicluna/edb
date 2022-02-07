import { PhotosTabProps } from '../../types';

export type PhotosProps = {
  isError?: boolean;
  isSuccess?: boolean;
  isLoading?: boolean;
} & Omit<PhotosTabProps, 'taggedImages' | 'isError' | 'isSuccess' | 'isLoading'>;
