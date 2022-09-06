import { Genre } from '../../../../../../../../common/types';
import { GenresStepProps } from '../../types';

export type GenreProps = Pick<GenresStepProps, 'color' | 'colorMode'> & {
	isActive?: boolean;
	onClick: () => void;
} & Genre;
