import { Certification } from '../../../../../../store/slices/Options/types';

export type CertificationProps = {
  isActive?: boolean;
  isLoading?: boolean;
  onClick?: (certification: Certification) => void;
} & Partial<Certification>;
