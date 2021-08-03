import { KnownFor } from '../../types';

export type KnownForProps = {
  knownFor: KnownFor;
  name?: string;
  isError?: boolean;
  isSuccess?: boolean;
  isLoading?: boolean;
};
