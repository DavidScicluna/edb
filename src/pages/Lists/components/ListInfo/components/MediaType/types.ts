import { MediaType } from '../../../../../../common/types/types';

export type MediaTypeProps = {
  mediaType: Omit<MediaType, 'person'>;
  amount: number;
};
