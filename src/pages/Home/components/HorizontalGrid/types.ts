import { Location } from 'history';

import { MediaType } from '../../../../common/types';
import { PartialMovie } from '../../../../common/types/movie';
import { PartialPerson } from '../../../../common/types/person';
import { PartialTV } from '../../../../common/types/tv';

type MediaTypeBooleans = {
  [key in MediaType]?: boolean;
};

type ToProps = {
  mediaType: MediaType;
};

export type HomeHorizontalGridProps = {
  title: string;
  to: (props: ToProps) => Partial<Location>;
  mediaTypes: MediaType[];
  data: {
    movie?: PartialMovie[];
    tv?: PartialTV[];
    person?: PartialPerson[];
  };
  isLoading: MediaTypeBooleans;
  isError: MediaTypeBooleans;
  isSuccess: MediaTypeBooleans;
};
