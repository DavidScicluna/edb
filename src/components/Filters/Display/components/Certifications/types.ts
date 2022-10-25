import { FiltersFormCertifications } from '../../../types';
import { CommonDisplayFiltersProps } from '../../common/types';

export type CertificationsProps = CommonDisplayFiltersProps & {
	certifications: FiltersFormCertifications;
};
