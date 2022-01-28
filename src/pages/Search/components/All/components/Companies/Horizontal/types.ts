import { Company } from '../../../../../../../common/types';

export type CompaniesProps = {
  query: string;
  companies?: Company[];
  total?: number;
};
