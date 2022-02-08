import { Certification } from '../../../../../../common/types';

export type CertificationProps = {
  isActive?: boolean;
  isLoading?: boolean;
  onClick?: (certification: Certification) => void;
} & Partial<Certification>;
