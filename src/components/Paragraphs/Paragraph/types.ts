import { CardProps } from '@davidscicluna/component-library';

export type ParagraphProps = Omit<CardProps, 'children' | 'colorMode' | 'isFullWidth'> & {
	children: string;
	title?: string;
	hasFooter?: boolean;
	keepFooter?: boolean;
};
