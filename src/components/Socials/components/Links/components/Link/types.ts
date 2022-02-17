import { Icon } from '../../../../../../common/types';
import { LinksProps } from '../../types';

export type LinkProps = {
	color?: string;
	icon?: Icon;
	href?: string;
	isDisabled?: boolean;
} & Omit<LinksProps, 'alt' | 'color' | 'socials' | 'isLoading'>;
