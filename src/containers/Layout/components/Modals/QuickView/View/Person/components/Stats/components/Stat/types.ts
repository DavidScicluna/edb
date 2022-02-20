import { Stat } from '../../types';

export type StatRef = HTMLDivElement | null;

export type StatProps = {
	isLoading?: boolean;
} & Stat;
