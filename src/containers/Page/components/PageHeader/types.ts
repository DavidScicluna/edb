import { ReactNode } from 'react';

import { StackProps, TextProps } from '@chakra-ui/react';

export type RenderProps = {
	width: number; // In Pixels
	height: number; // In Pixels
};

export type PageHeaderProps = Omit<StackProps, 'children'> & {
	renderTitle?: (props: TextProps) => ReactNode;
	renderSubtitle?: (props: TextProps) => ReactNode;
	renderLeftPanel?: (props: RenderProps) => ReactNode;
	renderRightPanel?: (props: RenderProps) => ReactNode;
	actions?: ReactNode;
};
