import { RenderProps } from '../../../../../../components/Title/types';

export type CertificationProps = {
	certification?: string;
	isLoading: boolean;
} & Omit<RenderProps, 'color' | 'fontWeight' | 'lineHeight'>;
