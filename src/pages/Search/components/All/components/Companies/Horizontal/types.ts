import { PartialCompany } from '../../../../../../../common/types';

export type CompaniesProps = {
  query: string;
  companies?: PartialCompany[];
  total?: number;
};
