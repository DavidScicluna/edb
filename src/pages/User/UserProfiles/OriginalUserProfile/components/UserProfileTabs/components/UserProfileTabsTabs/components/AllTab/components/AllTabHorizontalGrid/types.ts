import { HorizontalGridScrollProps } from '../../../../../../../../../../../../components/Grids/HorizontalGrids/HorizontalGrid/components/HorizontalGridScroll/types';

export type AllTabHorizontalGridProps = Pick<HorizontalGridScrollProps, 'children'> & {
	title: string;
	subtitle: string;
	footerLabel: string;
	onFooterClick?: () => void;
};
