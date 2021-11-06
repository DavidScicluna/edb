import { MediaType } from '../../../../../../common/types/types';
import { Crew } from '../../types';
import { PanelProps } from '../Panel/types';

export type CrewProps = {
  mediaType: Omit<MediaType, 'person'>;
  mediaItemTitle?: string;
  crew?: Crew;
  title: string;
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
} & Omit<PanelProps, 'children' | 'id' | 'title' | 'total'>;
