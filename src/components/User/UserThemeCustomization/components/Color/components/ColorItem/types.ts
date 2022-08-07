import { CardProps } from '@davidscicluna/component-library';

import { Form } from '../../../../types';

export type ColorItemProps = Pick<CardProps, 'isActive' | 'onClick'> & {
	label: string;
} & Form;
