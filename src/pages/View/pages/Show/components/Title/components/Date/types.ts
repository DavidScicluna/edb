import { FullTV } from '../../../../../../../../common/types/tv';
import { RenderProps } from '../../../../../../components/Title/types';

export type DateProps = {
	in_production: FullTV['in_production'];
	first_air_date: FullTV['first_air_date'];
	last_air_date: FullTV['last_air_date'];
	isLoading: boolean;
} & Omit<RenderProps, 'fontWeight' | 'lineHeight'>;
