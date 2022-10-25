import { Certification } from '../../../../../../../common/types';

export type CertificationProps = {
	isActive?: boolean;
	onClick: () => void;
} & Certification;
