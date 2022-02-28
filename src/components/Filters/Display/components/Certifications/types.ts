import { Filters } from '../../../types';

export type CertificationsProps = {
	certifications: Filters['certifications'];
	onClick?: () => void;
	onDelete?: () => void;
};
