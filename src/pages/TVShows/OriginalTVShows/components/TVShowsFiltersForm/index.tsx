import { FC } from 'react';

import { useTheme, Button } from '@davidscicluna/component-library';

import { useMediaQuery } from '@chakra-ui/react';

import { FiltersForm } from '../../../../../components';

import TVShowsFiltersFormBadge from './components/TVShowsFiltersFormBadge';
import { TVShowsFiltersFormProps } from './types';

const TVShowsFiltersForm: FC<TVShowsFiltersFormProps> = ({ total, isDisabled = false, onFilter }) => {
	const theme = useTheme();

	const [isLg] = useMediaQuery(`(max-width: ${theme.breakpoints.lg})`);

	return (
		<FiltersForm
			mediaType='tv'
			renderButton={(props) => (
				<Button
					{...props}
					renderRight={
						total > 0
							? ({ color, colorMode }) => (
									<TVShowsFiltersFormBadge color={color} colorMode={colorMode} total={total} />
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

export default TVShowsFiltersForm;
