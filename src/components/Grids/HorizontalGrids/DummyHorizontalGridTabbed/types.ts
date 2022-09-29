import { DummyCardProps, TabsProps } from '@davidscicluna/component-library';

export type DummyHorizontalGridTabbedProps = Omit<TabsProps, 'onChange' | 'isDisabled'> & {
	dummyCardProps?: Omit<DummyCardProps, 'children' | 'color' | 'colorMode'>;
};
