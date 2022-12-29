import { ReactNode } from 'react';

import { IconProps } from '@davidscicluna/component-library';

import { StackProps, TextProps } from '@chakra-ui/react';

export type ViewReviewsReviewSubtitleProps = Omit<StackProps, 'direction' | 'spacing'> & {
	renderIcon: (props: Omit<IconProps, 'icon' | 'category'>) => ReactNode;
	renderLabel: (props: TextProps) => ReactNode;
};
