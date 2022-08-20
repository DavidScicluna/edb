import { GenresStepProps } from '../../types';

export type ActionsProps = Pick<GenresStepProps, 'color' | 'colorMode'> & {
	allGenres: number;
	genres: number;
	onClear: () => void;
	onToggle: () => void;
};
