import { DummyCardProps } from '@davidscicluna/component-library';

export type DummyParagraphProps = Omit<DummyCardProps, 'children' | 'colorMode' | 'isFullWidth'>;
