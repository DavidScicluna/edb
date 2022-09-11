import { CardBodyProps, HorizontalScrollProps } from '@davidscicluna/component-library';

export type HorizontalGridBodyProps = Omit<CardBodyProps, 'children'> & Pick<HorizontalScrollProps, 'children'>;
