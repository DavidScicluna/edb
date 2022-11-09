import { UserGenresProps } from '../../types';

export type UserGenresActionsProps = Pick<UserGenresProps, 'color' | 'colorMode'> & {
	allGenres: number;
	genres: number;
	onClear: () => void;
	onToggle: () => void;
};
