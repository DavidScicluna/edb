import { PartialTV } from '../../../../../../common/types/tv';

export type TVProps = {
  query: string;
  shows?: PartialTV[];
  total?: number;
};
