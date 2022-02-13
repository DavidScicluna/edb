import { Episode } from '../../../../../../../../common/types/tv';
import { RenderProps } from '../../../../../../components/Title/types';

export type DateProps = {
  air_date: Episode['air_date'];
  isLoading: boolean;
} & Omit<RenderProps, 'fontWeight'>;
