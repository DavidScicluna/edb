import { FC, useRef, useState } from 'react';

import { useLocation } from 'react-router';

import { Nullable, useTheme, Button, Badge, BadgeLabel } from '@davidscicluna/component-library';

import { useMediaQuery } from '@chakra-ui/react';

import { useCountUp } from 'react-countup';
import { useDebounce, useEffectOnce, useUpdateEffect } from 'usehooks-ts';

import FiltersForm from '../../../../../components/Filters/Form';

import { MoviesFiltersFormProps } from './types';
import { getTotalFilters } from './common/utils';

const MoviesFiltersForm: FC<MoviesFiltersFormProps> = ({ isDisabled = false, onFilter }) => {
	const theme = useTheme();

	const [isLg] = useMediaQuery(`(max-width: ${theme.breakpoints.lg})`);

	const countUpRef = useRef<Nullable<HTMLParagraphElement>>(null);

	const location = useLocation();

	const [total, setTotal] = useState<number>(getTotalFilters({ location }) || 0);
	const totalDebounced = useDebounce<number>(total, 500);

	const { start, update } = useCountUp({
		ref: countUpRef,
		start: 0,
		end: totalDebounced,
		delay: 2.5,
		duration: 2.5,
		startOnMount: false
	});

	useEffectOnce(() => (totalDebounced > 0 ? start() : undefined));

	useUpdateEffect(() => (totalDebounced ? update(totalDebounced) : undefined), [totalDebounced]);

	useUpdateEffect(() => setTotal(getTotalFilters({ location }) || 0), [location.search]);

	return (
		<FiltersForm
			mediaType='movie'
			renderButton={(props) => (
				<Button
					{...props}
					renderRight={
						totalDebounced > 0
							? ({ color, colorMode }) => (
									<Badge color={color} colorMode={colorMode} size='xs'>
										<BadgeLabel>
											<p ref={countUpRef} />
										</BadgeLabel>
									</Badge>
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
