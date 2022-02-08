import { Color } from '../../../../theme/types';
import { Tab, Size } from './components/Tab/types';

export type TabListProps = {
  children: Tab[];
  color?: keyof Color;
  isFullWidth?: boolean;
  size?: Size;
};
