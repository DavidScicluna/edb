import { Space, HorizontalScrollProps } from '@davidscicluna/component-library';

export type HorizontalGridScrollProps = {
	spacing?: Space;
} & Pick<HorizontalScrollProps, 'children'>;
