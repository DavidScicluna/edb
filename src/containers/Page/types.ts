import { ReactElement } from 'react';

import { StackProps } from '@chakra-ui/react';

export type RenderProps = {
	width: number;
	height: number;
};

export type PageChildren = {
	renderLeftHeaderPanel?: (props: RenderProps) => ReactElement;
	renderRightHeaderPanel?: (props: RenderProps) => ReactElement;
	actions?: ReactElement;
	body: ReactElement;
};

export type PageProps = {
	children: PageChildren;
	title?: string | ReactElement;
	direction?: StackProps['direction'];
};
