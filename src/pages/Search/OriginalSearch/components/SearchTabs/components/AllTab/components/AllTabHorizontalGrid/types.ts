import { HorizontalGridScrollProps } from '../../../../../../../../../components/Grids/HorizontalGrids/HorizontalGrid/components/HorizontalGridScroll/types';
import { HorizontalGridProps } from '../../../../../../../../../components/Grids/HorizontalGrids/HorizontalGrid/types';

export type AllTabHorizontalGridProps = Pick<HorizontalGridProps, 'isDisabled'> & {
	title: string;
	subtitle: string;
	footerLabel: string;
	onFooterClick?: () => void;
} & Pick<HorizontalGridScrollProps, 'children'>;
