import { RenderProps } from 'dayzed';

export type HeaderProps = {
	dayzed: RenderProps;
	month: number;
	year: number;
	onToggleYears: () => void;
	onToggleMonths: () => void;
};
