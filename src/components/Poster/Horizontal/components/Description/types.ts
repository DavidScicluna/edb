import { MediaType } from '../../../../../common/types/types';

export type DescriptionProps = {
  mediaType: MediaType;
  mediaItem: {
    id: number;
    title: string;
    description: string;
  };
  isLoaded: boolean;
};
