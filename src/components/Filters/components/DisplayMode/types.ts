import { Icon } from '../../../../common/types';
import { Form } from '../../types';

export type DisplayMode = {
  label: string;
  value: Form['displayMode'];
  iconActive: Icon;
  icon: Icon;
};
