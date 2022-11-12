import { HorizontalGridBodyProps } from '../../../../../../../components/Grids/HorizontalGrids/HorizontalGrid/components/HorizontalGridBody/types';
import { HorizontalGridProps } from '../../../../../../../components/Grids/HorizontalGrids/HorizontalGrid/types';

export type TrendingAllTabHorizontalGridProps = Pick<HorizontalGridProps, 'isDisabled'> & {
	title: string;
	subtitle: string;
	footerLabel: string;
	onFooterClick?: () => void;
} & Pick<HorizontalGridBodyProps, 'children'>;
