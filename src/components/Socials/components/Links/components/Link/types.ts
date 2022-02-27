import { ReactNode } from 'react';

import { LinksProps } from '../../types';

export type LinkProps = {
	color?: string;
	icon?: ReactNode;
	href?: string;
	isDisabled?: boolean;
} & Omit<LinksProps, 'alt' | 'color' | 'socials' | 'isLoading'>;
