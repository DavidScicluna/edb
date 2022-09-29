import { Space, CardBodyProps, HorizontalScrollProps } from '@davidscicluna/component-library';

export type HorizontalGridBodyProps = Omit<CardBodyProps, 'children'> & {
	spacing?: Space;
} & Pick<HorizontalScrollProps, 'children'>;
