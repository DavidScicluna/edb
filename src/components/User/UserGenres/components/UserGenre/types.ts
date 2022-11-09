import { Genre } from '../../../../../common/types';
import { UserGenresProps } from '../../types';

export type UserGenreProps = Pick<UserGenresProps, 'color' | 'colorMode'> & {
	isActive?: boolean;
	onClick: () => void;
} & Genre;
