import { ReactNode } from 'react';

import { StackProps } from '@chakra-ui/react';

import { HeadlineProps } from '../../../../components/Headline/types';

export type RenderProps = {
	width: number; // In Pixels
	height: number; // In Pixels
};

export type PageHeaderProps = Omit<StackProps, 'children'> & {
	renderLeftPanel?: (props: RenderProps) => ReactNode;
	renderRightPanel?: (props: RenderProps) => ReactNode;
	actions?: ReactNode;
} & Pick<HeadlineProps, 'renderTitle' | 'renderSubtitle'>;
