import { Icon } from '../../../../../../common/types';
import { LinksProps } from '../Links/types';

export type SocialProps = {
  defaultColor?: string;
  color?: string;
  icon: Icon;
  type: string;
  href: string;
  isDisabled?: boolean;
} & Omit<LinksProps, 'color' | 'socials' | 'isLoading'>;
