import { Video } from '../../../../../../../../common/types';
import { VideosProps } from '../../types';

export type VideoProps = {
  video?: Video | number;
  isLoading?: boolean;
} & Omit<VideosProps, 'isError' | 'isSuccess' | 'isLoading' | 'videos'>;
