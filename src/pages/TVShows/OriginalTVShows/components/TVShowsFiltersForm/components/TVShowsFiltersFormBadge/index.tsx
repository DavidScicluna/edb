import { FC, useRef } from 'react';

import { Nullable, useTheme, Badge, BadgeLabel, utils } from '@davidscicluna/component-library';

import { useEffectOnce, useUpdateEffect } from 'usehooks-ts';
import { useCountUp } from 'react-countup';

import { TVShowsFiltersFormBadgeProps } from './types';

const { convertStringToNumber } = utils;

const TVShowsFiltersFormBadge: FC<TVShowsFiltersFormBadgeProps> = ({ color, colorMode, total = 0 }) => {
	const theme = useTheme();

	const countUpRef = useRef<Nullable<HTMLParagraphElement>>(null);

	const { start, update } = useCountUp({
		ref: countUpRef || '',
		start: 0,
		end: total,
		delay: convertStringToNumber(theme.transition.duration.slower, 'ms') / 1000,
		duration: convertStringToNumber(theme.transition.duration.slower, 'ms') / 1000,
		startOnMount: false
	});

	useEffectOnce(() => (total > 0 ? start() : undefined));

	useUpdateEffect(() => (total ? update(total) : undefined), [total]);

	return (
		<Badge color={color} colorMode={colorMode} size='xs'>
			<BadgeLabel>
				<p ref={countUpRef} />
			</BadgeLabel>
		</Badge>
	);
};

export default TVShowsFiltersFormBadge;
