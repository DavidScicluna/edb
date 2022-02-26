import { ReactElement } from 'react';
import { LinkProps as RRDLinkProps } from 'react-router-dom';

import { Style } from '../../../common/types';

export type LinkProps = {
	children: ReactElement;
	isFullWidth?: boolean;
	isDisabled?: boolean;
	sx?: Style;
} & RRDLinkProps;
// & Omit<CUILinkProps, 'colorScheme' | 'href' | 'target' | 'isExternal' | 'size' | 'variant'>;
