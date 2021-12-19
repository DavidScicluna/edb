import { MediaType } from '../../../../../common/types';

export type DescriptionProps = {
  mediaType: MediaType;
  mediaItem: {
    id: number;
    title: string;
    description: string;
  };
  isLoading: boolean;
};
