import { HorizontalGridBodyProps } from '../../../../../../../../../components/Grids/HorizontalGrids/HorizontalGrid/components/HorizontalGridBody/types';

export type AllTabHorizontalGridProps = Pick<HorizontalGridBodyProps, 'children'> & {
	title: string;
	subtitle: string;
	footerLabel: string;
	onFooterClick?: () => void;
};
