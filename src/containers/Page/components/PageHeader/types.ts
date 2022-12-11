import { ReactNode } from 'react';

import { HeadlineProps } from '@davidscicluna/component-library';

import { StackProps } from '@chakra-ui/react';

export type PageHeaderRenderProps = {
	width: number; // In Pixels
	height: number; // In Pixels
};

export type PageHeaderProps = Omit<StackProps, 'children'> & {
	renderLeftPanel?: (props: PageHeaderRenderProps) => ReactNode;
	renderRightPanel?: (props: PageHeaderRenderProps) => ReactNode;
	actions?: ReactNode;
} & Pick<HeadlineProps, 'renderTitle' | 'renderSubtitle'>;
