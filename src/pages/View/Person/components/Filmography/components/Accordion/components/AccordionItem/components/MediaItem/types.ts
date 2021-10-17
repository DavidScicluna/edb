import { MediaType } from '../../../../../../../../../../../common/types/types';

export type MediaItemProps = {
  id: number;
  mediaType: Omit<MediaType, 'person'>;
  title: string;
  subtitle: string;
  date?: string;
};
