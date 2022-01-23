import { Collection } from '../../../../types';

export type CollectionsProps = {
  query: string;
  collections?: Collection[];
  total?: number;
};
