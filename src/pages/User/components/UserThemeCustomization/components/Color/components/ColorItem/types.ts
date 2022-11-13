import { CardProps } from '@davidscicluna/component-library';

import { UserThemeCustomizationForm } from '../../../../types';

export type ColorItemProps = Pick<CardProps, 'isActive' | 'onClick'> & {
	label: string;
} & UserThemeCustomizationForm;
