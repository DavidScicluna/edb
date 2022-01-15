import { MediaType } from '../../../../../../common/types';

export type InactiveProps = {
  mediaTypes: MediaType[];
  onSetMediaType: (mediaType: MediaType) => void;
};
