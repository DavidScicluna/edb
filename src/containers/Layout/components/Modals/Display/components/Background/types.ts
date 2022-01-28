import { Icon } from '../../../../../../../common/types';
import { FontSizes } from '../../../../../../../theme/types';
import { Form } from '../../types';

type RenderIconProps = {
  isActive: boolean;
  fontSize: FontSizes['2xl'];
};

export type Background = {
  label: string;
  value: Form['background'];
  renderIcon: (props: RenderIconProps) => Icon;
};
