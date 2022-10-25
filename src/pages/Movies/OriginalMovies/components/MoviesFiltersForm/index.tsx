import { FC, useRef } from 'react';

import { Nullable, useTheme, Button, Badge, BadgeLabel, utils } from '@davidscicluna/component-library';

import { useMediaQuery } from '@chakra-ui/react';

import { useCountUp } from 'react-countup';
import { useEffectOnce, useUpdateEffect } from 'usehooks-ts';

import { FiltersForm } from '../../../../../components';

import { MoviesFiltersFormProps } from './types';

const { convertStringToNumber } = utils;

const MoviesFiltersForm: FC<MoviesFiltersFormProps> = ({ total, isDisabled = false, onFilter }) => {
	const theme = useTheme();

	const [isLg] = useMediaQuery(`(max-width: ${theme.breakpoints.lg})`);

	const countUpRef = useRef<Nullable<HTMLParagraphElement>>(null);

	const { start, update } = useCountUp({
		ref: countUpRef,
		start: 0,
		end: total,
		delay: convertStringToNumber(theme.transition.duration.slower, 'ms') / 1000,
		duration: convertStringToNumber(theme.transition.duration.slower, 'ms') / 1000,
		startOnMount: false
	});

	useEffectOnce(() => (total > 0 ? start() : undefined));

	useUpdateEffect(() => (total ? update(total) : undefined), [total]);

	return (
		<FiltersForm
			mediaType='movie'
			renderButton={(props) => (
				<Button
					{...props}
					renderRight={
						total > 0
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
