import { ButtonProps } from '@davidscicluna/component-library';

import { AxiosConfigParams } from '../../../../../common/types';
import { SortByProps } from '../../../../../components/SortBy/types';

export type MoviesSortByProps = Pick<SortByProps, 'onSort'> & {
	params: AxiosConfigParams;
} & Pick<ButtonProps, 'isDisabled'>;
