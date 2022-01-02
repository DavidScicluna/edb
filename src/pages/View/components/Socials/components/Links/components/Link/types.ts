import { Icon } from '../../../../../../../../common/types';
import { LinksProps } from '../../types';

export type LinkProps = {
  defaultColor?: string;
  color?: string;
  icon?: Icon;
  type?: string;
  href?: string;
  isDisabled?: boolean;
} & Omit<LinksProps, 'color' | 'socials' | 'isLoading'>;
