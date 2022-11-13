import { CardProps } from '@davidscicluna/component-library';

import { UserThemeColorMode } from '../../../../../../../../store/slices/Users/types';
import { Form } from '../../../../types';

export type ColorModeItemProps = Pick<CardProps, 'isActive' | 'onClick'> & {
	label: string;
	value: UserThemeColorMode;
} & Form;
