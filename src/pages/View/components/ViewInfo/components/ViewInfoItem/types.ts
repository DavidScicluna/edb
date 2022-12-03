import { ReactNode } from 'react';

import { IconProps } from '@davidscicluna/component-library';

import { StackProps, TextProps } from '@chakra-ui/react';

export type ViewInfoItem = Omit<StackProps, 'direction' | 'spacing'> & {
	renderIcon?: (props: Omit<IconProps, 'icon' | 'category'>) => ReactNode;
	renderLabel: (props: TextProps) => ReactNode;
};

export type ViewInfoItemProps = ViewInfoItem;
