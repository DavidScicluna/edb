// import {} from '@davidscicluna/component-library';

import { IconProps, TabsProps } from '@davidscicluna/component-library';

// TODO: Use TabList Tab RenderProps type
export type DummyTabIconProps = Pick<TabsProps, 'color' | 'colorMode'> & {
	height?: number;
} & Pick<IconProps, 'icon' | 'category'>;
