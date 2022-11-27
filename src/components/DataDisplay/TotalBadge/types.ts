import { BadgeProps } from '@davidscicluna/component-library';

export type TotalBadgeProps = Pick<BadgeProps, 'color' | 'colorMode' | 'size' | 'variant'> & {
	prefix?: string;
	suffix?: string;
	total?: number;
};
