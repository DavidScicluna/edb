import { PhotosTabProps } from '../../types';

export type TaggedPhotosProps = {
  isError?: boolean;
  isSuccess?: boolean;
  isLoading?: boolean;
} & Omit<PhotosTabProps, 'images' | 'isError' | 'isSuccess' | 'isLoading'>;
