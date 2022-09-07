import { CardProps } from '@davidscicluna/component-library';

import { Form } from '../../../../types';

export type LanguageProps = Pick<CardProps, 'isActive' | 'onClick'> & Form;
