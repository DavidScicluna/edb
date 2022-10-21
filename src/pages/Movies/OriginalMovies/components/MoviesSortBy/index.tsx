import { FC, useState, useCallback, useEffect } from 'react';

import { Undefinable, IconType, useTheme, Button, Icon } from '@davidscicluna/component-library';

import { useMediaQuery } from '@chakra-ui/react';

import { SortBy } from '../../../../../components';
import { movieSortBy } from '../../../../../components/SortBy/common/data';

import { MoviesSortByProps } from './types';

const MoviesSortBy: FC<MoviesSortByProps> = ({ params, isDisabled = false, onSort }) => {
	const theme = useTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const [icon, setIcon] = useState<Undefinable<IconType>>();
	const [label, setLabel] = useState<string>('Sort By');

	const handleGetIcon = useCallback((): void => {
		if (params && params.sort_by && typeof params.sort_by === 'string') {
			const split = (params.sort_by as string).split('.');

			setIcon(split && split[1] ? (split[1] === 'asc' ? 'arrow_upward' : 'arrow_downward') : undefined);
		}
	}, [params]);

	const handleGetLabel = useCallback((): void => {
		if (params && params.sort_by && typeof params.sort_by === 'string') {
			const split = (params.sort_by as string).split('.');
			const sort = movieSortBy.find(({ value }) => split[0] === value);

			setLabel(sort && sort.label ? `Sort By: ${sort.label}` : 'Sort By');
		}
	}, [params, movieSortBy]);

	useEffect(() => {
		handleGetIcon();
		handleGetLabel();
	}, [params]);

	return (
		<SortBy
			mediaType='movie'
			renderButton={({ color, colorMode, onClick }) => (
				<Button
					color={color}
					colorMode={colorMode}
					renderRight={
						icon
							? ({ color, colorMode, height }) => (
									<Icon
										width={`${height}px`}
										height={`${height}px`}
										fontSize={`${height}px`}
										colorMode={colorMode}
										icon={icon}
										category='outlined'
										skeletonColor={color}
									/>
							  )
							: undefined
					}
					isFullWidth={isSm}
					isDisabled={isDisabled}
					onClick={onClick}
					variant='outlined'
				>
					{label}
				</Button>
			)}
			onSort={onSort}
		/>
	);
};

export default MoviesSortBy;
