import { FC } from 'react';

import { useTheme, Button } from '@davidscicluna/component-library';

import { useMediaQuery } from '@chakra-ui/react';

import { FiltersForm } from '../../../../../components';

import { MoviesFiltersFormProps } from './types';
import MoviesFiltersFormBadge from './components/MoviesFiltersFormBadge';

const MoviesFiltersForm: FC<MoviesFiltersFormProps> = ({ total, isDisabled = false, onFilter }) => {
	const theme = useTheme();

	const [isLg] = useMediaQuery(`(max-width: ${theme.breakpoints.lg})`);

	return (
		<FiltersForm
			mediaType='movie'
			renderButton={(props) => (
				<Button
					{...props}
					renderRight={
						total > 0
							? ({ color, colorMode }) => (
									<MoviesFiltersFormBadge color={color} colorMode={colorMode} total={total} />
							  )
							: undefined
					}
					isFullWidth={isLg}
					isDisabled={isDisabled}
					variant='outlined'
				>
					Filter
				</Button>
			)}
			onFilter={onFilter}
		/>
	);
};

export default MoviesFiltersForm;
