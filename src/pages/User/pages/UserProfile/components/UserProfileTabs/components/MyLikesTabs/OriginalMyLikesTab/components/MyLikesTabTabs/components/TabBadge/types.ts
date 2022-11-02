import { BadgeProps } from '@davidscicluna/component-library';

export type TabBadgeProps = Pick<BadgeProps, 'color' | 'colorMode' | 'variant'> & {
	total?: number;
};
