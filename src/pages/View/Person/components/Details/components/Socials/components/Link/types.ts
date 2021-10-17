import { Icon } from '../../../../../../../../../common/types/types';
import { LinksProps } from '../Links/types';

export type LinkProps = {
  color?: string;
  icon: Icon;
  type: string;
  href: string;
  isDisabled?: boolean;
} & Omit<LinksProps, 'socials' | 'isLoading'>;
