import { Collection } from '../../../../../../../common/types/movie';

export type CollectionsProps = {
  query: string;
  collections?: Collection[];
  total?: number;
};
