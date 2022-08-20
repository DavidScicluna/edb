import { ReactNode } from 'react';

import { ButtonProps } from '@davidscicluna/component-library';

import { CommonEmptyProps } from '../common/types';

type RenderBadgeProps = Pick<CommonEmptyProps, 'colorMode'>;

type RenderActionProps = Pick<CommonEmptyProps, 'colorMode'> & {
	children: 'Try again';
} & Pick<ButtonProps, 'size' | 'variant'>;

export type QueryErrorProps = Omit<CommonEmptyProps, 'renderAction'> & {
	type: string;
	renderBadge?: (props: RenderBadgeProps) => ReactNode;
	renderAction: (props: RenderActionProps) => ReactNode;
};
