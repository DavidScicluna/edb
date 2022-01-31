import { FullPerson } from '../../../../../../common/types/person';
import { Department } from '../../types';

export type CreditsProps = {
  departments?: Department[];
  name?: FullPerson['name'];
  isError?: boolean;
  isSuccess?: boolean;
  isLoading?: boolean;
};
