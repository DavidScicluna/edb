import { IconProps, TabsProps } from '@davidscicluna/component-library';

// TODO: Use TabList Tab RenderProps type
export type TrendingTabIconProps = Pick<TabsProps, 'color' | 'colorMode'> & {
	height?: number;
} & Pick<IconProps, 'icon' | 'category'>;
