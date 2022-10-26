import { ButtonProps } from '@davidscicluna/component-library';

import { SortByProps } from '../../../../../components/SortBy/types';

export type TVShowsSortByProps = Pick<SortByProps, 'onSort'> & Pick<ButtonProps, 'isDisabled'>;
