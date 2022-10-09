import { ReactNode } from 'react';

import { BadgeProps } from '@davidscicluna/component-library';

import { ListItemProps as CUIListItemProps, TextProps } from '@chakra-ui/react';

export type SearchListItemVariant = 'transparent' | 'contained';

export type SearchListItemProps = Omit<CUIListItemProps, 'children' | 'title'> & {
	renderTitle: (props: TextProps) => ReactNode;
	renderSubtitle?: (props: TextProps) => ReactNode;
	renderBadge?: (props: BadgeProps) => ReactNode;
	actions?: ReactNode;
	variant?: SearchListItemVariant;
};
