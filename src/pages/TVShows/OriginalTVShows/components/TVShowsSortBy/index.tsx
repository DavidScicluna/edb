import { FC } from 'react';

import { useTheme, Button } from '@davidscicluna/component-library';

import { useMediaQuery } from '@chakra-ui/react';

import { SortBy } from '../../../../../components';

import { TVShowsSortByProps } from './types';

const TVShowsSortBy: FC<TVShowsSortByProps> = ({ isDisabled = false, onSort }) => {
	const theme = useTheme();

	const [isLg] = useMediaQuery(`(max-width: ${theme.breakpoints.lg})`);

	return (
		<SortBy
			mediaType='tv'
			renderButton={(props) => (
				<Button {...props} isFullWidth={isLg} isDisabled={isDisabled} variant='outlined'>
					Sort By
				</Button>
			)}
			onSort={onSort}
		/>
	);
};

export default TVShowsSortBy;
