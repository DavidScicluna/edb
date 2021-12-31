import { UseFormReturn } from 'react-hook-form';

import { Certification } from '../../../../common/types';
import { Form } from '../../types';

export type CertificationsProps = {
  certifications?: Certification[];
  form: UseFormReturn<Form>;
  isLoading?: boolean;
  isError?: boolean;
};
