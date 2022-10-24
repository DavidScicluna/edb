import { ButtonProps } from '@davidscicluna/component-library';

import { SortByProps } from '../../../../../components/SortBy/types';

export type MoviesSortByProps = Pick<SortByProps, 'onSort'> & Pick<ButtonProps, 'isDisabled'>;
