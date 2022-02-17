export type Direction = 'back' | 'forward';

export type HeaderProps = {
	currentYears: number[];
	index?: number;
	minDate?: Date;
	maxDate?: Date;
	onNavigateClick: (direction: Direction) => void;
};
