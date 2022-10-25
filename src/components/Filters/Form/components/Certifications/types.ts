import { CommonFiltersFormProps } from '../../common/types';
import { FiltersFormProps } from '../../types';

export type CertificationsProps = CommonFiltersFormProps & Pick<FiltersFormProps, 'mediaType'>;
